import { createReview } from '../services/reviewService.js';
import { throwErr } from '../utils/errorHandler.js';

export const addReview = async (req, res, next) => {
    try {
        const { listingId, bookingId, rating, comment } = req.body;
        const userId = req.user.sub;

        if (!listingId || !bookingId || !rating || !comment) {
            throwErr("Required fields are missing", 400);
        }

        const review = await createReview(listingId, bookingId, rating, comment, userId);

        res.status(201).json({ success: true, message: "Review added successfully", review });
    } catch (error) {
        next(error);
    }
}