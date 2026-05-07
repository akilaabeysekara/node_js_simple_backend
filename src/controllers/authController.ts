// authController.ts

import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import bcrypt from "bcryptjs";

// Login user
export const loginUser = async (req: Request, res: Response) => {

    try {

        // Get email and password
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check user exists
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Invalid password
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Success response
        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};