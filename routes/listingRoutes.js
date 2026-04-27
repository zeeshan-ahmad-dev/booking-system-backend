import express from 'express';
import { addListing, getListings } from '../controllers/listingController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { restrictTo } from '../middlewares/restrictRoleMiddleware.js';

const router = express.Router()

router.get('/', asyncHandler(getListings));
router.post('/', restrictTo("host"), asyncHandler(addListing));

export default router;