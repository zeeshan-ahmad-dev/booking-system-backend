import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const SECRET = process.env.SECRET_KEY;
console.log(SECRET);


export const generateToken = async (payload) => {
    try {
        const token = jwt.sign(payload, SECRET, { algorithm: 'HS256', expiresIn: "24h" });

        return token;
    } catch (error) {
        console.log("Error generating token");
        throw error;
    }
}