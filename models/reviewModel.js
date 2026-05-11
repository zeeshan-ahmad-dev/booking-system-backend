import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true});

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;