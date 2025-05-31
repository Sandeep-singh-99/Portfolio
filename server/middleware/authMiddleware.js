import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token      

        if(!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized -Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}