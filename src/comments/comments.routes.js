import { Router } from "express";
import { CommentController } from "./comments.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { commentSchema } from "./comments.validation.js";

const router = Router();

router.post(
  "/:postId",
  AuthMiddleware.verifyToken,
  ValidationMiddleware.validate(commentSchema),
  CommentController.create
);

router.get("/:postId", CommentController.list);

router.put(
  "/:commentId",
  AuthMiddleware.verifyToken,
  ValidationMiddleware.validate(commentSchema),
  CommentController.update
);

router.delete("/:commentId", AuthMiddleware.verifyToken, CommentController.remove);

export default router;
