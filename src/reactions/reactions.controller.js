import { ReactionService } from "./reactions.service.js";
import { sendResponse } from "../common/utils.common.js";

export class ReactionController {
  static async add(req, res, next) {
    try {
      const { type, postId, commentId } = req.body;
      const reaction = await ReactionService.addReaction({
        type,
        userId: req.user.id,
        postId,
        commentId,
      });
      return sendResponse(res, 201, true, "Reaction added", reaction);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req, res, next) {
    try {
      const { postId, commentId } = req.body;
      const reaction = await ReactionService.removeReaction({
        userId: req.user.id,
        postId,
        commentId,
      });
      return sendResponse(res, 200, true, "Reaction removed", reaction);
    } catch (err) {
      next(err);
    }
  }

  static async list(req, res, next) {
    try {
      const { postId, commentId } = req.query;
      const reactions = await ReactionService.getReactions({ postId, commentId });
      return sendResponse(res, 200, true, "Reactions fetched", reactions);
    } catch (err) {
      next(err);
    }
  }

  static async count(req, res, next) {
    try {
      const { postId, commentId } = req.query;
      const counts = await ReactionService.countReactions({ postId, commentId });
      return sendResponse(res, 200, true, "Reactions counted", counts);
    } catch (err) {
      next(err);
    }
  }
}
