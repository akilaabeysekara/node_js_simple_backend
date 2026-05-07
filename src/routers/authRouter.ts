// authRouter.ts

import { Router } from "express";
import { loginUser } from "../controllers/authController";

const router = Router();

// Login route
router.post("/login", loginUser);

export default router;