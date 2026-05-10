import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { addBooking, approveBooking, cancelBooking, getBookings } from '../controllers/bookingController.js';
import { restrictTo } from '../middlewares/restrictRoleMiddleware.js';

const router = express.Router();

router.get("/my", authMiddleware, asyncHandler(getBookings));
router.post("/:listingId", authMiddleware, asyncHandler(addBooking));
router.patch("/:bookingId/confirm", authMiddleware, restrictTo("host"), asyncHandler(approveBooking));
router.patch("/:bookingId/cancel", authMiddleware, restrictTo("host"), asyncHandler(cancelBooking));

export default router;