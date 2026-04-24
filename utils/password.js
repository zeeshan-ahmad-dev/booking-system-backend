import bcrypt from 'bcrypt';

const SALT  = 10;

// Create a hashed password
export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT);

        return hashedPassword;
    } catch (error) {
        console.log(`Failed to hash password: ${error}`)
        throw error;
    }
}

// Check if password is correct
export const comparePassword = async (password, hashedPassword) => {
    try {
        const areMatched = await bcrypt.compare(password, hashedPassword);

        return areMatched;
    } catch (error) {
        console.log(`Passwords don't match: ${error}`)
        throw error;
    }
}