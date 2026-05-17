import cron from "node-cron";
import bookingModel from "../models/bookingModel.js";

// Auto-cancel pending bookings older than 30 minutes
// Prevents stale reservations from blocking listing availability
cron.schedule("*/30 * * * *", async () => {
    await bookingModel.updateMany(
        {
            status: "pending",
            createdAt: { $lt: Date.now() - 30 * 60 * 1000 }
        },
        {
            status: "cancelled"
        }
    );
});