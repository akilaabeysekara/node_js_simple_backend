import express from "express"
import customerRouter from "./routers/customerRouter"; //default import of the customer router
import userRouter from "./routers/userRouter"; //default import of the user router
import authRouter from "./routers/authRouter"; //default import of the auth router
import mongoose from "mongoose";// Import the Mongoose library for MongoDB interactions
import dotenv from "dotenv"; // Import the dotenv library to load environment variables from a .env file
dotenv.config(); // Load environment variables from the .env file

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/customer_db"; // Get the MongoDB URI from environment variables or use a default value
const PORT = process.env.PORT || 5000; // Get the port number from environment variables or use a default value

const app = express(); // Create an instance of the Express application

app.use(express.json());
app.use("/api/v1/customer", customerRouter); // Use the customer router for routes starting with "/customer"
app.use("/api/v1/user", userRouter); // Use the user router for routes starting with "/user"
app.use("/api/v1/auth", authRouter); // Use the auth router for routes starting with "/auth"

app.get("/", (req, res) => {
    res.send("Welcome to the Customer API!"); // Send a welcome message for the root route
});

mongoose
.connect(MONGO_URI)
.then(() => {
    // Connection to MongoDB is successful, start the server 
    // app.listen(5000, () => {});
    // console.log("Connected to MongoDB"); // Log a message when the connection to MongoDB is successful
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err); // Log an error message if the connection to MongoDB fails
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log a message when the server starts successfully
});
