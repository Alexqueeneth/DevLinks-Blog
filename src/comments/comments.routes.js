import { Router } from "express";
import { CommentController } from "./comment.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";
import { validateRequest } from "../common/middleware/validate.middleware.js";
import { commentSchema } from "./comment.validation.js";

const router = Router();

router.post("/:postId", AuthMiddleware, validateRequest(commentSchema), CommentController.create);
router.get("/:postId", CommentController.list);
router.put("/:commentId", AuthMiddleware, validateRequest(commentSchema), CommentController.update);
router.delete("/:commentId", AuthMiddleware, CommentController.remove);

export default router;
