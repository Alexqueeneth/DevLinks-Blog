import { CommentModel } from "./comment.model.js";
import { ReactionService } from "../reactions/reaction.service.js";

export class CommentService {
  static async createComment({ postId, author, content }) {
    return await CommentModel.create({ post: postId, author, content });
  }

  static async getCommentsByPost(postId) {
    const comments = await CommentModel.find({ post: postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return Promise.all(
      comments.map(async (comment) => {
        const reactions = await ReactionService.countReactions({
          entityId: comment._id,
          entityType: "Comment"
        });
        return { ...comment.toObject(), reactions };
      })
    );
  }

  static async updateComment(commentId, author, content) {
    return await CommentModel.findOneAndUpdate(
      { _id: commentId, author },
      { content },
      { new: true }
    );
  }

  static async deleteComment(commentId, author) {
    return await CommentModel.findOneAndDelete({ _id: commentId, author });
  }
}
