import bookingModel from "../models/bookingModel.js";
import reviewModel from "../models/reviewModel.js"
import { throwErr } from "../utils/errorHandler.js";

export const createReview = async (listingId, bookingId, rating, comment, userId) => {
    const booking = await bookingModel.findOne({ _id: bookingId, listing: listingId, user: userId });

    if (!booking || booking.status !== "confirmed") {
        throwErr("You cannot review on this listing", 400)
    }

    const existingReview = await reviewModel.findOne({
        booking: bookingId,
        user: userId
    });

    if (existingReview) {
        throwErr("You already reviewed this booking", 400);
    }

    const review = await reviewModel.create({listing: listingId, boking: bookingId, rating, comment, user: userId});

    return review;
}