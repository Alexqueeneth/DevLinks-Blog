import { ReactionModel } from "../database/models/reactions.models.js";
import { PostModel } from "../database/models/post.models.js";
import { CommentModel } from "../database/models/comment.models.js";
import { NotificationService } from "../notifications/notification.s.service.js";


export class ReactionService {
  static async addReaction({ type, userId, postId, commentId }) {
    const reaction = await ReactionModel.findOneAndUpdate(
      { user: userId, post: postId, comment: commentId },
      { type },
      { new: true, upsert: true }
    );
    return reaction;
  }

  static async removeReaction({ userId, postId, commentId }) {
    const reaction = await ReactionModel.findOneAndDelete({
      user: userId,
      post: postId,
      comment: commentId,
    });
    return reaction;
  }

  static async getReactions({ postId, commentId }) {
    const filter = postId ? { post: postId } : { comment: commentId };
    return ReactionModel.find(filter).populate("user", "username email");
  }

  static async countReactions({ postId, commentId }) {
    const filter = postId ? { post: postId } : { comment: commentId };
    return ReactionModel.aggregate([
      { $match: filter },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);
  }
  static async addReaction(userId, { postId, commentId, type }) {
  const reaction = new ReactionModel({ user: userId, post: postId, comment: commentId, type });
  await reaction.save();

  if (postId) {
    const post = await PostModel.findById(postId);
    if (post && String(post.author) !== String(userId)) {
      await NotificationService.create({
        recipient: post.author,
        sender: userId,
        type: "reaction",
        postId,
        message: "Someone reacted to your post",
      });
    }
  }

  if (commentId) {
    const comment = await CommentModel.findById(commentId);
    if (comment && String(comment.user) !== String(userId)) {
      await NotificationService.create({
        recipient: comment.user,
        sender: userId,
        type: "reaction",
        commentId,
        message: "Someone reacted to your comment",
      });
    }
  }

  return reaction;
}

}
