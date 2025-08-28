import { Router } from "express";
import { PostController } from "./post.controller.js";
import { validate } from "../common/middleware/validation.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.validation.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// CRUD
router.post("/", authMiddleware, validate(createPostSchema), PostController.createPost);
router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", authMiddleware, validate(updatePostSchema), PostController.updatePost);
router.delete("/:id", authMiddleware, PostController.deletePost);

// publishing
router.put("/:id/publish", authMiddleware, PostController.publishPost);
router.put("/:id/schedule", authMiddleware, PostController.schedulePost);

// reactions
router.post("/:id/reactions", authMiddleware, PostController.addReaction);
router.delete("/:id/reactions", authMiddleware, PostController.removeReaction);

// retrieval
router.get("/status/published", PostController.getPublishedPosts);

export default router;
