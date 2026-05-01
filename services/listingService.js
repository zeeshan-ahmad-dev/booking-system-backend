import listingsModel from "../models/listingsModel.js"

export const createListing = async (data) => {
    const listing = await listingsModel.insertOne({ ...data, host: data.hostId})

    return listing;
}

export const fetchAllListings = async (page, limit, location, price) => {
    const filter = {};
    page = +page;
    limit = +limit;

    if (location) {
        filter.location = location;
    }
    if (price) {
        filter.price = price;
    }

    const listings = await listingsModel.find(filter).skip((page - 1) * limit).limit(limit);

    return listings;
}

export const fetchListing = async (listingId) => {
    const listing = await listingsModel.findById(listingId);

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
        throw new Error("Listing not updated");
    }

    return listing;
}

export const deleteListingInDB = async (id, userId) => {
    const isOwner = await listingsModel.findOne({ _id: id, host: userId })
    if (!isOwner) {
        throw new Error("You are not authorized!");
    }

    const listing = await listingsModel.findByIdAndDelete(id);

    if (!listing) {
        throw new Error("Listing not found");
    }

    return listing;
}