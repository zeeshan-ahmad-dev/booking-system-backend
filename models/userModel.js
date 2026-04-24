import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['guest', 'host', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("user", userSchema);