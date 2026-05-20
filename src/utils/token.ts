import { IUser } from '../models/userModel'; // Import the IUser interface from the userModel file
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for signing tokens//defult expoted
import dotenv from "dotenv"; // Import the dotenv library to load environment variables from a .env file
dotenv.config(); // Load environment variables from the .env file

const JWT_SECRET = process.env.JWT_SECRET as string; // Get the JWT secret key from environment variables or use a default value
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string; // Get the JWT refresh secret key from environment variables or use a default value

export const signAccessToken = (user:IUser): string => { // : from typescript to specify the type of the user parameter// return type of the function is string because we are returning a token which is a string
    // Implement token signing logic here
    // For example, you can use jsonwebtoken library to sign the token
    // and return the signed token

      return  jwt.sign({
            sub: user._id.toString(), // Set the subject of the token to the user's ID
            roles:user.roles, // Include the user's roles in the token payload
            email: user.email // Include the user's email in the token payload
        }, JWT_SECRET, { expiresIn: '30' }); // Example of signing a token with an empty payload, the JWT secret key, and an expiration time of 30 days
    }

export const signRefreshToken = (user:IUser): string => { // : from typescript to specify the type of the user parameter// return type of the function is string because we are returning a token which is a string
    // Implement refresh token signing logic here
    // For example, you can use jsonwebtoken library to sign the refresh token
    // and return the signed refresh token

        return  jwt.sign({
            sub: user._id.toString(), // Set the subject of the refresh token to the user's ID
        }, JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Example of signing a refresh token with an empty payload, the JWT refresh secret key, and an expiration time of 7 days
    }