import { Router } from "express"
import { createUser, login } from "../controllers/authController"
import { hello } from "../middleware/testMid"
import { getMyDetails } from "../controllers/userController"
import { authenticate } from "../middleware/auth"

const router = Router()

// PUBLIC
router.post("/register", createUser)
router.post("/login", login)

// PROTECTED
router.get("/me", authenticate,getMyDetails)
router.get("/hello",authenticate, getMyDetails)

export default router       