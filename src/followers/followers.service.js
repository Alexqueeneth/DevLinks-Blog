import { FollowerModel } from "../database/models/follower.models.js";

export class FollowersService {
  static async followUser(followerId, followingId) {
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself");
    }
    return FollowerModel.create({ follower: followerId, following: followingId });
  }

  static async unfollowUser(followerId, followingId) {
    return FollowerModel.findOneAndDelete({ follower: followerId, following: followingId });
  }

  static async getFollowers(userId) {
    return FollowerModel.find({ following: userId }).populate("follower", "username email");
  }

  static async getFollowing(userId) {
    return FollowerModel.find({ follower: userId }).populate("following", "username email");
  }
}
