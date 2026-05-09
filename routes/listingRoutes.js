import express from 'express';
import { addListing, getAllListings, getListing, updateListing, deleteListing } from '../controllers/listingController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { restrictTo } from '../middlewares/restrictRoleMiddleware.js';

const router = express.Router()

router.get('/', asyncHandler(getAllListings));
router.get('/:id', asyncHandler(getListing));
router.post('/', restrictTo("host"), asyncHandler(addListing));
router.put('/:id', restrictTo("host"), asyncHandler(updateListing));
router.delete('/:id', restrictTo("host"), asyncHandler(deleteListing));

export default router;