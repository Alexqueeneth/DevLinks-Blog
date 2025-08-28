import { PostService } from "./post.service.js";
import { sendResponse } from "../common/utils/sendResponse.js";

export class PostController {
  static async createPost(req, res, next) {
    try {
      const post = await PostService.createPost(req.body, req.user.id);
      sendResponse(res, 201, true, "Post created", post);
    } catch (error) {
      next(error);
    }
  }

  static async getPosts(req, res, next) {
    try {
      const posts = await PostService.getPosts();
      sendResponse(res, 200, true, "Posts retrieved", posts);
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const post = await PostService.getPostById(req.params.id);
      sendResponse(res, 200, true, "Post retrieved", post);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const post = await PostService.updatePost(req.params.id, req.body);
      sendResponse(res, 200, true, "Post updated", post);
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      await PostService.deletePost(req.params.id, req.user.id);
      sendResponse(res, 200, true, "Post deleted");
    } catch (error) {
      next(error);
    }
  }

  static async publishPost(req, res, next) {
    try {
      const post = await PostService.publishPost(req.params.id, req.user.id);
      sendResponse(res, 200, true, "Post published", post);
    } catch (error) {
      next(error);
    }
  }

  static async schedulePost(req, res, next) {
    try {
      const post = await PostService.schedulePost(
        req.params.id,
        req.user.id,
        req.body.publishDate
      );
      sendResponse(res, 200, true, "Post scheduled", post);
    } catch (error) {
      next(error);
    }
  }

  static async addReaction(req, res, next) {
    try {
      const post = await PostService.addReaction(req.params.id, req.user.id, req.body.type);
      sendResponse(res, 200, true, "Reaction added", post);
    } catch (error) {
      next(error);
    }
  }

  static async removeReaction(req, res, next) {
    try {
      const post = await PostService.removeReaction(req.params.id, req.user.id, req.body.type);
      sendResponse(res, 200, true, "Reaction removed", post);
    } catch (error) {
      next(error);
    }
  }

  static async getPublishedPosts(req, res, next) {
    try {
      const posts = await PostService.getPublishedPosts();
      sendResponse(res, 200, true, "Published posts retrieved", posts);
    } catch (error) {
      next(error);
    }
  }
}
