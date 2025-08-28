import { Router } from "express";
import { NotificationController } from "./notifications.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, NotificationController.getAll);
router.get("/unread-count", authMiddleware, NotificationController.getUnreadCount);
router.patch("/:id/read", authMiddleware, NotificationController.markRead);

export default router;
