import cloudinary from "../configs/cloudinary.js";

export const uploadToCloudinary = async (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
        .upload_stream(
            { folder: "booking_system" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        )
        .end(buffer);
    });
}