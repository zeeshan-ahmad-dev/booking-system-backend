import { stripe } from "../configs/stripe.js";
import bookingModel from "../models/bookingModel.js"
import { throwErr } from "../utils/errorHandler.js";


export const getPaymentClientSecret = async (bookingId) => {
    const booking = await bookingModel.findById(bookingId).populate("listing");
    if (!booking) {
        throwErr("Booking not found", 404);
    }

    if (booking.status === "cancelled") {
        throwErr("Booking cancelled", 400);
    }

    if (booking.paymentStatus === "paid") {
        throwErr("Booking already paid", 400);
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: booking.totalPrice * 100,
        currency: booking.listing.price.currency.toLowerCase(),
        metadata: {
            bookingId: booking._id.toString()
        }
    });

    return paymentIntent.client_secret;
}