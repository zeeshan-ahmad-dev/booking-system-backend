import bookingModel from "../models/bookingModel.js";
import listingModel from "../models/listingModel.js";
import { calculateTotalPrice } from "../utils/calculateTotalPrice.js";
import { throwErr } from "../utils/errorHandler.js";

export const createBooking = async (listingId, startDate, endDate, userId) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    
    if (endDate <= startDate) {
        throwErr("End date must be after start date", 400);
    }
    
    const bookings = await bookingModel.find({
        listing: listingId,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
    });

    if (bookings.length > 0) {
        throwErr("This listing is already booked for selected dates", 409);
    }

    const listing = await listingModel.findById(listingId);

    if(!listing) {
        throwErr("No listing found", 404);
    }

    if (!listing.availability) {
        throwErr("Listing not available", 409);
    }

    if (listing.host.toString() === userId.toString()) {
        throwErr("You cannot book your own listing", 403);
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
        throwErr("Booking not available", 404);
    }

    if (booking.listing.host.toString() !== userId.toString()) {
        throwErr("You are not the host", 403);
    }

    booking.status = "confirmed";

    await booking.save();

    return booking;
}

export const cancelBooking = async (bookingId, userId) => {
    const booking = await bookingModel.findById(bookingId).populate("listing");

    if (!booking) {
        throwErr("Booking not available", 404);
    }

    if (booking.status === "cancelled") {
        throwErr("This booking is already cancelled", 409);
    }

    if (booking.listing.host.toString() !== userId.toString()) {
        throwErr("You are not the host", 403);
    }

    booking.status = "cancelled";

    await booking.save();

    return booking;
}