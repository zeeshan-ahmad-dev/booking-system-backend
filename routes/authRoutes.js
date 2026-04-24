import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router()

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

export default router;