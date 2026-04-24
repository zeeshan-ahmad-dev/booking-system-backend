import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(`Error connecting to db: ${error}`);
    }
}