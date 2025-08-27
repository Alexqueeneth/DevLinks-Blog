import { Router } from "express";
import { PostController } from "./post.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.validation.js";

const router = Router();

// Public
router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);

// Protected
router.post(
  "/",
  AuthMiddleware.verifyToken,
  ValidationMiddleware.validate(createPostSchema),
  PostController.create
);

router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  ValidationMiddleware.validate(updatePostSchema),
  PostController.update
);

router.delete("/:id", AuthMiddleware.verifyToken, PostController.delete);

router.post("/:id/like", AuthMiddleware.verifyToken, PostController.like);
router.post("/:id/unlike", AuthMiddleware.verifyToken, PostController.unlike);

export default router;
