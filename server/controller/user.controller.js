import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (username, password, res) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    const userExists = await User.findOne({ username });

    if (!userExists) {
        throw new Error('User does not exist');
    }

    if (userExists.password !== password) {
        throw new Error('Incorrect password');
    }

    const token = generateToken(userExists._id, res);

    return {
        userExists,
        token
    }
}

