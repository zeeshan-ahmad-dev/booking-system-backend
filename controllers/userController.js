import { createUser } from '../services/userService.js';
import { getUsername } from '../utils/getUsername.js';
import { hashPassword } from '../utils/password.js';

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // 1. Create username
    const username = await getUsername(firstName, lastName);
    // 2. Create hashed password
    const hashedPassword = await hashPassword(password);
    // 3. Store user
    const user = await createUser(firstName, lastName, email, username, hashedPassword, role);

    res.status(201).json({ success: true, message: "User is created"})
}