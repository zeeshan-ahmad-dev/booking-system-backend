import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { addBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post("/:listingId", authMiddleware, asyncHandler(addBooking));

export default router;