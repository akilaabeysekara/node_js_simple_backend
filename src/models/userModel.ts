import { Document,Schema } from "mongoose";
import { model } from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    MANAGER = "MANAGER"
}

interface IUser extends Document {
    name: string;
    password: string;
    role: string;
    email?: string;
    isApproved : boolean;
}

const userSchema = new Schema<IUser>({ 
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, 
        enum: Object.values(UserRole), 
        required: true }, // Define the role field as a string with allowed values from the UserRole enum, and make it required
    email: { type: String },
    isApproved: { type: Boolean, required: true }

});

export const userModel = model<IUser>("User", userSchema);
