import { Router } from "express";
import { ReactionController } from "./reactions.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

router.post("/", AuthMiddleware.verifyToken, ReactionController.add);
router.delete("/", AuthMiddleware.verifyToken, ReactionController.remove);
router.get("/", ReactionController.list);
router.get("/count", ReactionController.count);

export default router;
