import { Router } from "express";
import { NotificationController } from "./notification.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

router.get("/", AuthMiddleware.verifyToken, NotificationController.getAll);
router.get("/unread-count", AuthMiddleware.verifyToken, NotificationController.getUnreadCount);
router.patch("/:id/read", AuthMiddleware.verifyToken, NotificationController.markRead);

export default router;
