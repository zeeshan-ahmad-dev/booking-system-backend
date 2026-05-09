import { createBooking, confirmBooking, cancelBooking as cancellBookingService } from '../services/bookingService.js';

export const addBooking = async (req, res, next) => {
    try {
        const { listingId } = req.params;
        const { startDate, endDate } = req.body;
        
        if (!startDate || !endDate || !listingId) {
            const err = new Error("Please provide full details");
            err.status = 400;
            throw err;
        }
        
        const booking = await createBooking(listingId, startDate, endDate, req.user.sub);
        
        return res.status(201).json({ success: true, message: "Booking created successfully", booking })
    } catch (error) {
        next(error);
    }
}

export const approveBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const { sub } = req.user;

        const booking = await confirmBooking(bookingId, sub)
        
        return res.status(200).json({ success: true, message: "Booking confirmed successfully", booking })
    } catch (error) {
        next(error)
    }
}

export const cancelBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const { sub } = req.user;

        const booking = await cancellBookingService(bookingId, sub)
        
        return res.status(200).json({ success: true, message: "Booking cancelled successfully", booking })
    } catch (error) {
        next(error)
    }
}