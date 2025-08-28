import { Router } from "express";
import multer from "multer";
import { MediaController } from "./media.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// ✅ Local storage (can later replace with Cloudinary/S3)
const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("file"), MediaController.upload);
router.get("/:id", MediaController.get);
router.delete("/:id", authMiddleware, MediaController.delete);

export default router;
