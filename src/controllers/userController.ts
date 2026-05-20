// customer.controller.ts

import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";

// Save user
export const saveUser = async (req: Request, res: Response) => {

    try {

        // Get data from request body
        const { name, password, role, email, isApproved } = req.body;

        // Check password exists
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = new UserModel({
            name,
            password: hashedPassword,
            role,
            email,
            isApproved
        });

        // Save user to MongoDB
        const savedUser = await newUser.save();

        // Send success response
        res.status(201).json({
            message: "User saved successfully",
            data: savedUser
        });

    } catch (error: any) {

        // Print error in console
        console.log(error);

        // Send error response
        res.status(500).json({
            message: "Error saving user",
            error: error.message
        });
    }
};

// Get all users
export const getAllUser = async (req: Request, res: Response) => {

    try {

        // Get all users from database
        const users = await UserModel.find();

        // Send user list
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });

    } catch (error: any) {

        // Print error in console
        console.log(error);

        // Send error response
        res.status(500).json({
            message: "Error retrieving users",
            error: error.message
        });
    }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {

    try {

        // Get MongoDB _id from params
        const { id } = req.params;

        // If password exists, hash it before update
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // Update user
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        // Check user exists
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Send success response
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error: any) {

        // Print error in console
        console.log(error);

        // Send error response
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {

    try {

        // Get MongoDB _id from params
        const { id } = req.params;

        // Delete user
        const deletedUser = await UserModel.findByIdAndDelete(id);

        // Check user exists
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Send success response
        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error: any) {

        // Print error in console
        console.log(error);

        // Send error response
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};