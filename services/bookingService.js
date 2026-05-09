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

export const confirmBooking = async (bookingId, userId) => {
    const booking = await bookingModel.findById(bookingId).populate("listing");
    
    if (!booking) {
        const err = new Error;
        err.message = "Booking not available";
        err.status = 404;
        throw err;
    }

    if (booking.listing.host.toString() !== userId.toString()) {
        const err = new Error;
        err.message = "You are not the host";
        err.status = 401;
        throw err;
    }

    booking.status = "confirmed";

    await booking.save();

    return booking;
}

export const cancelBooking = async (bookingId, userId) => {
    const booking = await bookingModel.findById(bookingId).populate("listing");

    if (!booking) {
        const err = new Error;
        err.message = "Booking not available";
        err.status = 404;
        throw err;
    }

    if (booking.listing.host.toString() !== userId.toString()) {
        const err = new Error;
        err.message = "You are not the host";
        err.status = 401;
        throw err;
    }

    booking.status = "cancelled";

    await booking.save();

    return booking;
}