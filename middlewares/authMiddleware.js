import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;

export const authMiddleware = async (req, res, next) => {
    const token = req.cookie?.token;
    
    if (!token) {
        return res.status(401).json({ success: false, message: "No token, Unauthorized"});
    }

    try {
        const decode = jwt.verify(token, SECRET);
        req.user = decode;
        next();
    } catch (error) {   
        return res.status(401).json({ message: "Invalid token" });
    }
}