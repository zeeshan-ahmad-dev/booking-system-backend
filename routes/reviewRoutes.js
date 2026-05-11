import express from 'express';
import { addReview } from '../controllers/reviewController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router()

router.post('/', asyncHandler(addReview));

export default router;