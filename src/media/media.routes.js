import { Router } from "express";
import multer from "multer";
import { MediaController } from "./media.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// ✅ Local storage (can later replace with Cloudinary/S3)
const upload = multer({ dest: "uploads/" });

router.post("/", AuthMiddleware.verifyToken, upload.single("file"), MediaController.upload);
router.get("/:id", MediaController.get);
router.delete("/:id", AuthMiddleware.verifyToken, MediaController.delete);

export default router;
