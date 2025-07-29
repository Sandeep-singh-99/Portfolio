// import mongoose from "mongoose";

// export const ConnectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI as string);
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error);
//     }
// }

import mongoose from "mongoose";

let isConnected = false;

export const ConnectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;

    if (process.env.NODE_ENV === "development") {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
