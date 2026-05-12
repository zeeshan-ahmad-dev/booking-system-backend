import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
        lowercase: true,
        trim: true
    }
}, { timestamps: true });

bookingSchema.pre("save", function(next) {
    if (this.endDate <= this.startDate) {
        return next(new Error("End date must be after start date"));
    }
});

bookingSchema.index({ listing: 1, startDate: 1, endDate: 1 });

const bookingModel = mongoose.model("booking", bookingSchema);

export default bookingModel;