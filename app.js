import express from 'express';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './db/config.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { logger } from './middlewares/loggerMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import paymentRoutes from './routes/paymentRoute.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import "./cron/bookingCleanupJob.js";
import { stripeWebhook } from './controllers/paymentController.js';

configDotenv();
connectDb();

const app = express();
const PORT = process.env.PORT || 8000;  

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/auth", authRoutes);
app.use("/listings", authMiddleware, listingRoutes);
app.use("/bookings", authMiddleware, bookingRoutes);
app.use("/reviews", authMiddleware, reviewRoutes);
app.use("/payments", authMiddleware, paymentRoutes);

app.get("/", (req, res) => {
    res.send(`API is running on PORT: ${PORT}`);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));