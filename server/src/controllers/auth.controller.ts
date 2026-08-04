import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check whether email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create and save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};