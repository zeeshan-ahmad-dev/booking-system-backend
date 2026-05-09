import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { addBooking, approveBooking, cancelBooking } from '../controllers/bookingController.js';
import { restrictTo } from '../middlewares/restrictRoleMiddleware.js';

const router = express.Router();

router.post("/:listingId", authMiddleware, asyncHandler(addBooking));
router.patch("/confirm/:bookingId", authMiddleware, restrictTo("host"), asyncHandler(approveBooking));
router.patch("/cancel/:bookingId", authMiddleware, restrictTo("host"), asyncHandler(cancelBooking));

export default router;