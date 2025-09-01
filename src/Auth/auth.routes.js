import { Router } from "express";
import { register, login } from "./auth.controller.js";

const router = Router();

// Root auth endpoint that provides information about available auth endpoints
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Authentication service is available",
        endpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login"
        }
    });
});

// Handle POST to root auth path - could be used for generic auth operations
router.post("/", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Please specify the auth action",
        availableEndpoints: {
            register: "POST /api/auth/register",
            login: "POST /api/auth/login"
        }
    });
});

router.post("/register", register);
router.post("/login", login);

export default router;
