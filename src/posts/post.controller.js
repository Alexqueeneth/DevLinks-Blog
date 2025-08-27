import { PostService } from "./post.service.js";
import { sendResponse } from "../common/utils.common.js";

export class PostController {
  static async create(req, res) {
    try {
      const post = await PostService.createPost(req.body, req.user.id);
      return sendResponse(res, 201, true, "Post created successfully", post);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      return sendResponse(res, 200, true, "Posts fetched successfully", posts);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }

  static async getOne(req, res) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) return sendResponse(res, 404, false, "Post not found");
      return sendResponse(res, 200, true, "Post fetched successfully", post);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }

  static async update(req, res) {
    try {
      const post = await PostService.updatePost(req.params.id, req.body, req.user.id);
      return sendResponse(res, 200, true, "Post updated successfully", post);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }

  static async delete(req, res) {
    try {
      const post = await PostService.deletePost(req.params.id, req.user);
      return sendResponse(res, 200, true, "Post deleted successfully", post);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }

  static async like(req, res) {
    try {
      const post = await PostService.likePost(req.params.id, req.user.id);
      return sendResponse(res, 200, true, "Post liked successfully", post);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }

  static async unlike(req, res) {
    try {
      const post = await PostService.unlikePost(req.params.id, req.user.id);
      return sendResponse(res, 200, true, "Post unliked successfully", post);
    } catch (err) {
      return sendResponse(res, 400, false, err.message);
    }
  }
}
