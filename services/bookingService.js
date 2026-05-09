import bookingModel from "../models/bookingModel.js";
import listingModel from "../models/listingModel.js";
import { calculateTotalPrice } from "../utils/calculateTotalPrice.js";

export const createBooking = async (listingId, startDate, endDate, userId) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    
    if (endDate <= startDate) {
        throw new Error("End date must be after start date");
    }
    
    const listing = await listingModel.findById(listingId);

    if(!listing) {
        const err = new Error;
        err.message = "No listing found";
        err.status = 404;
        throw err;
    }

    if (!listing.availability) {
        const err = new Error;
        err.message = "Listing not available";
        err.status = 404;
        throw err;
    }

    if (listing.host.toString() === userId.toString()) {
        const err = new Error;
        err.message = "You cannot book your own listing";
        err.status = 401;
        throw err;
    }

    const totalPrice = calculateTotalPrice(listing.startDate, listing.endDate, listing.price.amount, listing.priceType)

    const booking  = await bookingModel.create({
        user: userId,
        listing: listingId,
        startDate,
        endDate,
        totalPrice,
    });
    
    return booking;
}