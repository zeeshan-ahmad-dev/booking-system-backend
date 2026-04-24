import express from 'express';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './db/config.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { logger } from './middlewares/loggerMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import { asyncHandler } from './middlewares/asyncHandler.js';

configDotenv();
connectDb();

const app = express();
const PORT = process.env.PORT || 8000;  

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/auth", asyncHandler(authRoutes))
app.get("/", (req, res) => {
    res.send(`API is running on PORT: ${PORT}`);
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));