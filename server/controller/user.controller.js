import User from "../model/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

         generateToken(user._id, res);
         res.status(200).json({ _id: user._id, username: user.username })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        res.status(200).json({ message: "User is authenticated", data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}