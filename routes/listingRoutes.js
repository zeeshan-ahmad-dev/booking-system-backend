import express from 'express';
import { addListing, getAllListings, getListing, updateListing, deleteListing } from '../controllers/listingController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { restrictTo } from '../middlewares/restrictRoleMiddleware.js';

const router = express.Router()

router.get('/', getAllListings);
router.get('/:id', getListing);
router.post('/', restrictTo("host"), addListing);
router.put('/:id', restrictTo("host"), updateListing);
router.delete('/:id', restrictTo("host"), deleteListing);

export default router;