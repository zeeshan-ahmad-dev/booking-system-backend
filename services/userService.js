import userModel from "../models/userModel.js";

export const createUser = async (firstName, lastName, email, username, hashedPassword, role) => {
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !username?.trim() ||
    !hashedPassword || 
    !role
  ) {
    throw new Error("All fields are required");
  }

  try {
    
    const user = await userModel.create({ firstName, lastName, email, username, hashedPassword, role });
    
    return user;
  } catch (error) {
      if (error.code === 11000) {
          throw new Error("User already exists");
      }
    throw error;
  }
};
