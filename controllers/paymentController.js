import { stripe } from "../configs/stripe.js";
import bookingModel from "../models/bookingModel.js";
import { getPaymentClientSecret } from "../services/paymentService.js"

export const createPaymentIntent = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        
        const client_secret = await getPaymentClientSecret(bookingId);

        return res.json({
            clientSecret: client_secret
        })
    } catch (error) {
        next(error);
    }
}

export const stripeWebhook = async (req, res, next) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        next(error);
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;
        const booking = await bookingModel.findById(bookingId);

        if (booking) {
            if (booking.paymentStatus !== "paid") {
                booking.paymentStatus = "paid";
                booking.status = "confirmed";

                await booking.save();
            }
        }
    }

    if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.type.object;
        const bookignId = paymentIntent.metadata.bookingId;
        const booking = await bookingModel.findById(bookingId);

        if (booking) {
            if (booking.paymentStatus === "failed") {
                booking.paymentStatus = "failed"

                await booking.save();
            }
        }
    }

    return res.status(200).json({
        received: true
    })
}