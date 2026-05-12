import express from 'express';
import { addReview, getListingReviews, removeReview, updateReview } from '../controllers/reviewController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router()

router.get('/listings/:listingId', asyncHandler(getListingReviews));
router.patch('/:reviewId', asyncHandler(updateReview));
router.delete('/:reviewId', asyncHandler(removeReview));
router.post('/', asyncHandler(addReview));

export default router;