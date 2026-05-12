export const buildFilterQuery = (query) => {
    const filter = {};

    if (query.location) {
        filter.location = {
            $regex: query.location,
            $options: "i"
        }
    }

    if (query.minPrice || query.maxPrice) {
        filter["price.amount"] = {};
        if (query.minPrice) filter["price.amount"].$gte = Number(query.minPrice);
        if (query.maxPrice) filter["price.amount"].$lte = Number(query.maxPrice);
    }

    if (query.guests) {
        filter.maxGuests = { $gte: Number(query.guests) };
    }

    if (query.amenities) {
        const amentities = query.amenities.split(",");

        filter.amenities = { $all: amentities };
    }

    return filter;
}