import bookingModel from "../models/bookingModel.js";
import listingModel from "../models/listingModel.js";
import { calculateTotalPrice } from "../utils/calculateTotalPrice.js";

export const createBooking = async (listingId, startDate, endDate, userId) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    
    if (endDate <= startDate) {
        throw new Error("End date must be after start date");
    }
    
    const bookings = await bookingModel.find({
        listing: listingId,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
    });

    if (bookings.length > 0) {
        const err = new Error;
        err.message = "This listing is already booked for selected dates";
        err.status = 409;
        throw err;
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

    const totalPrice = calculateTotalPrice(startDate, endDate, listing.price.amount, listing.priceType)

    const booking  = await bookingModel.create({
        user: userId,
        listing: listingId,
        startDate,
        endDate,
        totalPrice,
    });
    
    return booking;
}