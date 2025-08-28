import { FollowersService } from "./followers.service.js";
import { sendResponse } from "../common/utils.common.js";

export class FollowersController {
  static async followUser(req, res, next) {
    try {
      const followerId = req.user.id; // from auth middleware
      const { userId: followingId } = req.params;

      const follow = await FollowersService.followUser(followerId, followingId);
      return sendResponse(res, 201, true, "User followed successfully", follow);
    } catch (error) {
      next(error);
    }
  }

  static async unfollowUser(req, res, next) {
    try {
      const followerId = req.user.id;
      const { userId: followingId } = req.params;

      await FollowersService.unfollowUser(followerId, followingId);
      return sendResponse(res, 200, true, "User unfollowed successfully");
    } catch (error) {
      next(error);
    }
  }

  static async getFollowers(req, res, next) {
    try {
      const { userId } = req.params;
      const followers = await FollowersService.getFollowers(userId);
      return sendResponse(res, 200, true, "Followers fetched successfully", followers);
    } catch (error) {
      next(error);
    }
  }

  static async getFollowing(req, res, next) {
    try {
      const { userId } = req.params;
      const following = await FollowersService.getFollowing(userId);
      return sendResponse(res, 200, true, "Following list fetched successfully", following);
    } catch (error) {
      next(error);
    }
  }
}
