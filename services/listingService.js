import bookingModel from "../models/bookingModel.js";
import listingsModel from "../models/listingModel.js"
import reviewModel from "../models/reviewModel.js";
import { throwErr } from "../utils/errorHandler.js";

export const createListing = async (data) => {
    if (!data.host) {
        throwErr("Host ID is required", 400);
    }

    const listing = await listingsModel.create(data);

    return listing;
}

export const fetchAllListings = async (page, limit, startDate, endDate, filter) => {
    page = +page;
    limit = +limit;

    const hasDateFilter = startDate && endDate;
    
    // Don't fetch listings which are booked from startDate to endDate 
    if (hasDateFilter) {
        const bookings = await bookingModel.find({ 
            startDate: { $lte: endDate }, 
            endDate: { $gte: startDate } 
        });
        
        const unavailableBookingIds = bookings.map((booking) => booking.listing)

        filter._id = { $nin: unavailableBookingIds };
    }

    const listings = await listingsModel.find(filter).skip((page - 1) * limit).limit(limit).lean();
    return listings;
}

export const fetchListing = async (listingId) => {
    if (!listingId) {
        throwErr("Listing id is required", 400);
    }

    const listing = await listingsModel.findById(listingId);

    if (!listing) {
        throwErr("Listing not found", 404);
    }

    return listing;
}

export const updateListingInDB = async (data, id) => {
    const updateData = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.price !== undefined) updateData.price = data.price;

    const listing = await listingsModel.findOneAndUpdate({ _id: id }, {$set: updateData}, {new: true});

    if (!listing) {
        throwErr("Listing not found", 404);
    }

    return listing;
}

export const deleteListingInDB = async (id, userId) => {
    const isOwner = await listingsModel.findOne({ _id: id, host: userId })
    if (!isOwner) {
        throwErr("You are not authorized!", 403);
    }

    const listing = await listingsModel.findByIdAndDelete(id);

    if (!listing) {
        throwErr("Listing not found", 404);
    }

    return listing;
}

export const fetchReviewsSummary = async (id) => {
    // Calculate review statistics (total reviews + average rating) for a listing
    const result = await reviewModel.aggregate([
        { $match: { listing: id } },
        { 
            $group: {
                _id: "$listing",
                totalReviews: { $sum: 1 },
                avgRating: { $avg: "$rating" }
            }
        }
    ]);

    return result[0] || {totalReviews: 0, avgRating: 0};
}