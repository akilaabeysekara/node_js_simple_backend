// customer.controller.ts

import { Request, Response } from "express";
import { customerModel } from "../models/customerModel";

// Save customer
export const saveCustomer = async (req: Request, res: Response) => {

    // Get data from request body
    const { name, age, isAdmin, email } = req.body;

    try {

        // Create new customer object
        const newCustomer = new customerModel({
            id: Date.now(),
            name,
            age,
            isAdmin,
            email
        });

        // Save customer to MongoDB
        const savedCustomer = await newCustomer.save();

        // Send success response
        res.status(201).json({
            message: "Customer saved successfully",
            data: savedCustomer
        });

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: "Error saving customer",
            error
        });
    }
};

// Get all customers
export const getAllCustomer = async (req: Request, res: Response) => {

    try {

        // Get all customers from database
        const customers = await customerModel.find();

        // Send customer list
        res.status(200).json({
            message: "Customers retrieved successfully",
            data: customers
        });

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: "Error retrieving customers",
            error
        });
    }
};

// Update customer
export const updateCustomer = async (req: Request, res: Response) => {

    try {

        // Get id from params
        const { id } = req.params;

        // Update customer
        const updatedCustomer = await customerModel.findOneAndUpdate(
            { id: Number(id) },
            req.body,
            { new: true }
        );

        // Check customer exists
        if (!updatedCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Send success response
        res.status(200).json({
            message: "Customer updated successfully",
            data: updatedCustomer
        });

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: "Error updating customer",
            error
        });
    }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {

    try {

        // Get id from params
        const { id } = req.params;

        // Delete customer
        const deletedCustomer = await customerModel.findOneAndDelete({
            id: Number(id)
        });

        // Check customer exists
        if (!deletedCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Send success response
        res.status(200).json({
            message: "Customer deleted successfully"
        });

    } catch (error) {

        // Send error response
        res.status(500).json({
            message: "Error deleting customer",
            error
        });
    }
};