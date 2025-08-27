import { ReactionService } from "./reaction.service.js";
import { sendResponse } from "../common/utils.common.js";

export class ReactionController {
  static async react(req, res, next) {
    try {
      const { type, entityType } = req.body;
      const { entityId } = req.params;

      const reaction = await ReactionService.addOrUpdateReaction({
        user: req.user._id,
        type,
        entityId,
        entityType,
      });

      return sendResponse(res, 200, true, "Reaction updated", reaction);
    } catch (error) {
      next(error);
    }
  }

  static async unreact(req, res, next) {
    try {
      const { entityType } = req.body;
      const { entityId } = req.params;

      await ReactionService.removeReaction({
        user: req.user._id,
        entityId,
        entityType,
      });

      return sendResponse(res, 200, true, "Reaction removed");
    } catch (error) {
      next(error);
    }
  }

  static async getReactions(req, res, next) {
    try {
      const { entityType } = req.query;
      const { entityId } = req.params;

      const reactions = await ReactionService.getReactions({ entityId, entityType });
      return sendResponse(res, 200, true, "Reactions fetched", reactions);
    } catch (error) {
      next(error);
    }
  }
}
