import { Router } from "express";
import { ReactionController } from "./reactions.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, ReactionController.add);
router.delete("/", authMiddleware, ReactionController.remove);
router.get("/", ReactionController.list);
router.get("/count", ReactionController.count);

export default router;
