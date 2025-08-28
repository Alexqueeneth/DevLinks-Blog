import { CommentService } from "./comments.service.js";
import { sendResponse } from "../common/utils.common.js";

export class CommentController {
  static async create(req, res, next) {
    try {
      const { content, parentComment } = req.body;
      const { postId } = req.params;

      const comment = await CommentService.createComment({
        postId,
        author: req.user._id,
        content,
        parentComment,
      });

      return sendResponse(res, 201, true, "Comment created", comment);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await CommentService.getCommentsByPost(postId);

      return sendResponse(res, 200, true, "Comments fetched", comments);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { content } = req.body;
      const { commentId } = req.params;

      const updated = await CommentService.updateComment(commentId, req.user._id, content);
      if (!updated) return sendResponse(res, 404, false, "Comment not found or not yours");

      return sendResponse(res, 200, true, "Comment updated", updated);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { commentId } = req.params;

      const deleted = await CommentService.deleteComment(commentId, req.user._id);
      if (!deleted) return sendResponse(res, 404, false, "Comment not found or not yours");

      return sendResponse(res, 200, true, "Comment deleted");
    } catch (error) {
      next(error);
    }
  }
}
