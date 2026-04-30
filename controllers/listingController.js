import { createListing, deleteListingInDB, fetchAllListings, fetchListing, updateListingInDB } from '../services/listingService.js';

export const addListing = async (req, res) => {
    const { title, description, location, price } = req.body;
    const hostId = req.user.sub;

    if (!title || !description || !location || !price || !hostId) {
        return res.status(400).json({ success: false, message: "Please, fill out the data" });
    };

    const listing = await createListing({title, description, location, price, hostId});

    res.status(201).json({ success: true, listing })
}

export const getAllListings = async (req, res) => {
    const listings = await fetchAllListings();

    res.status(200).json({ success: true, listings });
}
    

export const getListing = async (req, res) => {
    const listingId = req.params.id;

    const listing = await fetchListing(listingId);

    res.status(200).json({ success: true, listing });
}
    
export const updateListing = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ success: false, message: "Please, provide the listing id" });
    }

    const listing = await updateListingInDB(data, id);

    res.status(201).json({ success: true, listing })
}

export const deleteListing = async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ success: false, message: "Please, provide the listing id" });
    }

    const listing = await deleteListingInDB(id);

    res.status(201).json({ success: true, listing })
}