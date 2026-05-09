/**
 * Calculates price for per night
 * 
 * @param {Date} startDate Starting date for booking
 * @param {Date} endDate End date of booking
 * @param {Number} price Price for booking
 * @param {String} priceType Price type like month, week or night
 * @returns price per night
 */

export const calculateTotalPrice = (startDate, endDate, price, priceType) => {
    const diffTime = endDate - startDate;
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let pricePerNight = price;

    if (priceType === "month") {
        pricePerNight = price / 30;
    } else if (priceType === "week") {
        pricePerNight = price / 7;
    }

    return pricePerNight * days;
}