import userModal from "../models/userModel.js";

export const getUsername = async (fullName, lastName) => {
    const base = (fullName + lastName).toLowerCase();

    let username;
    let exists = true;

    while(exists) {
        const random = Math.floor(Math.random() * 9999) + 1;
        username = base + username;

        const user = await userModal.findOne({ username });
        if (!user) exists = false;
    }

    return username;
}