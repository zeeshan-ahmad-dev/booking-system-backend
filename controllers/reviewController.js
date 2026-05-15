import { createReview, fetchListingReviews, editReview, deleteReview } from '../services/reviewService.js';
import { throwErr } from '../utils/errorHandler.js';

export const addReview = async (req, res, next) => {
    try {
        const { listingId, bookingId, rating, comment } = req.body;
        const userId = req.user.sub;
        const ratingNum = Number(rating);

        if (!listingId || !bookingId || !rating || !comment) {
            throwErr("Required fields are missing", 400);
        }

        const review = await createReview(listingId, bookingId, ratingNum, comment, userId);

        res.status(201).json({ success: true, message: "Review added successfully", review });
    } catch (error) {
        next(error);
    }
}

export const getListingReviews = async (req, res, next) => {
    try {
        const { listingId } = req.params;

        const reviews = await fetchListingReviews(listingId);

        res.status(200).json({ success: true, message: "Reviews fetched succesfully", reviews });
    } catch (error) {
        next(error);
    }
}

export const updateReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { comment, rating } = req.body;

        const review = await editReview(reviewId, comment, rating);

        res.status(200).json({ success: true, message: "Reviews updated succesfully", review });
    } catch (error) {
        next(error);
    }
}

export const removeReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;

        const review = await deleteReview(reviewId);

        res.status(200).json({ success: true, message: "Reviews deleted succesfully", review });
    } catch (error) {
        next(error);
    }
}