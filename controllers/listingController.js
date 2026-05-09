import { createListing, deleteListingInDB, fetchAllListings, fetchListing, updateListingInDB } from '../services/listingService.js';

export const addListing = async (req, res) => {
    const { title,
        description,
        location,
        price,
        images,
        category,
        amenities,
        maxGuests,
        bedrooms,
        bathrooms,
        beds 
    } = req.body;
    const hostId = req.user.sub;

    if (!title || !description || !location || !price || !hostId) {
        return res.status(400).json({ success: false, message: "Please, fill out the data" });
    };

    const listingData = {
        title,
        description,
        location,
        price,
        hostId,
        images,
        category,
        amenities,
        maxGuests,
        bedrooms,
        bathrooms,
        beds 
    };

    const listing = await createListing(listingData);

    res.status(201).json({ success: true, listing })
}

export const getAllListings = async (req, res) => {
    const { page = 1, limit = 10, location, price } = req.query;
    
    const listings = await fetchAllListings(page, limit, location, price);

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
    const userId = req.user.sub;
    
    if (!id) {
        return res.status(400).json({ success: false, message: "Please, provide the listing id" });
    }

    const listing = await deleteListingInDB(id, userId);

    res.status(200).json({ success: true, listing })
}