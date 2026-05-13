import {
  createListing,
  deleteListingInDB,
  fetchAllListings,
  fetchListing,
  updateListingInDB,
  fetchReviewsSummary
} from "../services/listingService.js";
import { buildFilterQuery } from "../utils/buildFilterQuery.js";
import { uploadToCloudinary } from "../utils/cloudinaryHelper.js";
import { throwErr } from "../utils/errorHandler.js";

export const addListing = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      price,
      currency,
      propertyType,
      amenities,
      maxGuests,
      bedrooms,
      bathrooms,
      beds,
    } = req.body;

    const files = req.files;
    const hostId = req.user.sub;

    if (!title || !description || !location || price == null) {
      throwErr("Required fields are missing", 400);
    }

    const uploadedImages = await Promise.all(
      files.map(file => uploadToCloudinary(file.buffer))
    )

    const images = uploadedImages?.map((img) => img.secure_url) || [];
    const priceObj = {
      amount: Number(price),
      currency,
    };  

    const amenitiesArray = amenities?.split(",").map((amenity) => amenity.trim()).filter(Boolean) || [];

    const listing = await createListing({
      title,
      description,
      location,
      price: priceObj,
      host: hostId,
      images,
      propertyType,
      amenities: amenitiesArray,
      maxGuests,
      bedrooms,
      bathrooms,
      beds,
    });

    res.status(201).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, location, minPrice, maxPrice, startDate, endDate, guests, amenities } = req.query;

    const filter = buildFilterQuery({page, limit, location, minPrice, maxPrice, startDate, endDate, guests, amenities})

    const listings = await fetchAllListings(page, limit, startDate, endDate, filter);

    res.status(200).json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;

    const listing = await fetchListing(listingId);

    res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;

    if (!id) {
      throwErr("Please, provide the listing id", 400);
    }

    const listing = await updateListingInDB(data, id);

    res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please, provide the listing id" });
    }

    const listing = await deleteListingInDB(id, userId);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
      listing
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewsSummary = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please, provide the listing id" });
    }

    const rating = await fetchReviewsSummary(id);

    res.status(200).json({
      success: true,
      message: "Rating summary fetched successfully",
      rating
    });
  } catch (error) {
    next(error);
  }
};

