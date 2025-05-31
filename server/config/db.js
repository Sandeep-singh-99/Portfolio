import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
        console.error(error);
        process.exit(1);
    }
}