import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router()

router.post('/register', asyncHandler(registerUser));

export default router;