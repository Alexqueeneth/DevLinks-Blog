import { Router } from "express";
import { ReactionController } from "./reaction.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";
import { validateRequest } from "../common/middleware/validate.middleware.js";
import { reactionSchema } from "./reaction.validation.js";

const router = Router();

router.post("/:entityId", AuthMiddleware, validateRequest(reactionSchema), ReactionController.react);
router.delete("/:entityId", AuthMiddleware, ReactionController.unreact);
router.get("/:entityId", ReactionController.getReactions);

export default router;
