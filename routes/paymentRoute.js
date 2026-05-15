import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/create/:bookingId', authMiddleware, asyncHandler(createPaymentIntent));

export default router;