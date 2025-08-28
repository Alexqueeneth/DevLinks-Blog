import { Router } from "express";
import { FollowersController } from "./followers.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// follow & unfollow
router.post("/:userId", AuthMiddleware.authenticate, FollowersController.followUser);
router.delete("/:userId", AuthMiddleware.authenticate, FollowersController.unfollowUser);

// lists
router.get("/followers/:userId", FollowersController.getFollowers);
router.get("/following/:userId", FollowersController.getFollowing);

export default router;
