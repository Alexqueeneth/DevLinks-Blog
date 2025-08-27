import { ReactionModel } from "./reaction.model.js";

export class ReactionService {
  static async addOrUpdateReaction({ user, type, entityId, entityType }) {
    return await ReactionModel.findOneAndUpdate(
      { user, entityId, entityType },
      { type },
      { upsert: true, new: true }
    );
  }

  static async removeReaction({ user, entityId, entityType }) {
    return await ReactionModel.findOneAndDelete({ user, entityId, entityType });
  }

  static async getReactions({ entityId, entityType }) {
    return await ReactionModel.find({ entityId, entityType }).populate("user", "name email");
  }

  static async countReactions({ entityId, entityType }) {
    return await ReactionModel.aggregate([
      { $match: { entityId, entityType } },
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
  }
}
