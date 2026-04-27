import listingsModel from "../models/listingsModel.js"

export const createListing = async (data) => {
    const listing = await listingsModel.insertOne({ ...data, host: data.hostId})

    return listing;
}

export const fetchListings = async () => {
    const listing = await listingsModel.find();

    return listing;
}