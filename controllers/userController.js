import { createUser } from '../services/userService.js';
import { getUsername } from '../utils/getUsername.js';
import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    const username = await getUsername(firstName, lastName);
    const hashedPassword = await hashPassword(password);
    const user = await createUser(firstName, lastName, email, username, hashedPassword, role);

    const token = await generateToken({ sub: user._id, role: user.role });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // for development only true
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ success: true, message: "User is created"})
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+hashedPassword");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
    const passwordMatched = await comparePassword(password, user.hashedPassword);
    if (!passwordMatched) return res.status(400).json({ success: false, message: "Passwod not matched" });

    const token = await generateToken({ sub: user._id, role: user.role });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // for development only true
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ success: true, message: "User is loggedin"})
}