import { Router } from "express";
import { UserController } from "./user.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { createUserSchema, updateUserSchema } from "./user.validation.js";

const router = Router();

// Public
router.post(
  "/",
  ValidationMiddleware.validate(createUserSchema),
  UserController.create
);

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);

// Protected
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  ValidationMiddleware.validate(updateUserSchema),
  UserController.update
);

router.delete("/:id", AuthMiddleware.verifyToken, UserController.delete);

router.post("/:id/follow", AuthMiddleware.verifyToken, UserController.follow);
router.post("/:id/unfollow", AuthMiddleware.verifyToken, UserController.unfollow);
router.get("/:id/followers", UserController.followers);
router.get("/:id/following", UserController.following);

export default router;
