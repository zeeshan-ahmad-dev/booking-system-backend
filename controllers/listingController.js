import { createListing, fetchListings } from '../services/listingService.js';

export const addListing = async (req, res) => {
    const { title, description, location, price } = req.body;
    const hostId = req.user.sub;

    if (!title || !description || !location || !price || !hostId) {
        return res.status(400).json({ success: false, message: "Please, fill out the data" });
    };

    const listing = await createListing({title, description, location, price, hostId});

    res.status(201).json({ success: true, listing })
}

export const getListings = async (req, res) => {
    const userId = req.user.sub;

    const listings = await fetchListings();

    res.status(200).json({ success: true, listings });
}