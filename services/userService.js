import userModel from "../models/userModel.js";
import { throwErr } from "../utils/errorHandler.js";

export const createUser = async (firstName, lastName, email, username, hashedPassword, role) => {
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !username?.trim() ||
    !hashedPassword || 
    !role
  ) {
    throwErr("All fields are required", 400);
  }

  try {
    const user = await userModel.create({ firstName, lastName, email, username, hashedPassword, role });
    
    return user;
  } catch (error) {
      if (error.code === 11000) {
          throwErr("User already exists", 409);
      }

      throw error;
  }
};
