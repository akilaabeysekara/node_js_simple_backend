import express from "express";
import customerRouter from "./routers/customerRouter";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Environment variables
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/customer_db";

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Customer API!");
});

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });