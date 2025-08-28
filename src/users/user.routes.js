import { Router } from "express";
import { createUser, getUsers, getUser, updateMe, deleteUser, follow, unfollow, getFollowers, getFollowing } from "./user.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";

const router = Router();

// Public
router.post(
  "/",
  ValidationMiddleware.validate(createUserSchema),
  createUser
);

router.get("/", getUsers);
router.get("/:id", getUser);

// Protected
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  ValidationMiddleware.validate(updateUserSchema),
  updateMe
);

router.delete("/:id", AuthMiddleware.verifyToken, deleteUser);

router.post("/:id/follow", AuthMiddleware.verifyToken, follow);
router.post("/:id/unfollow", AuthMiddleware.verifyToken, unfollow);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

export default router;
