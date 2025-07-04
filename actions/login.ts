"use server";

import User, { IUser } from "../models/user.model";
import { cookies } from "next/headers";

// Define the LoginFormData interface
interface LoginFormData {
  email: string;
  password: string;
}

// Custom error class for authentication
class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

// Login server action
export async function Login(data: LoginFormData): Promise<{
  success: boolean;
  token?: string;
  user?: Partial<IUser>;
  error?: string;
}> {
  try {
    // Find user by email
    const user = await User.findOne({ email: data.email }).select("+password");

    if (!user) {
      throw new AuthError("User not found");
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AuthError("Incorrect password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret", // Use environment variable for secret
      { expiresIn: "1h" } // Token expiration
    );

    // Set token in cookies (optional, for client-side access)
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour in seconds
      path: "/",
    });

    // Return user data (excluding password) and token
    const { password, ...userWithoutPassword } = user.toObject();
    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}