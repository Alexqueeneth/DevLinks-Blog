import { Router } from "express";
import { PostController } from "./post.controller.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.validation.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// CRUD
router.post("/", AuthMiddleware.verifyToken, ValidationMiddleware.validate(createPostSchema), PostController.createPost);
router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", AuthMiddleware.verifyToken, ValidationMiddleware.validate(updatePostSchema), PostController.updatePost);
router.delete("/:id", AuthMiddleware.verifyToken, PostController.deletePost);

// publishing
router.put("/:id/publish", AuthMiddleware.verifyToken, PostController.publishPost);
router.put("/:id/schedule", AuthMiddleware.verifyToken, PostController.schedulePost);

// reactions
router.post("/:id/reactions", AuthMiddleware.verifyToken, PostController.addReaction);
router.delete("/:id/reactions", AuthMiddleware.verifyToken, PostController.removeReaction);

// retrieval
router.get("/status/published", PostController.getPublishedPosts);

export default router;
