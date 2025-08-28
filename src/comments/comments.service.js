import { CommentModel } from "../database/models/comment.models.js";
import { PostModel } from "../database/models/post.models.js";
import { ReactionService } from "../reactions/reactions.service.js";
import { NotificationService } from "../notifications/notification.s.service.js";

export class CommentService {
  // 🟢 Create comment or reply
  static async createComment({ postId, author, content, parentComment = null }) {
    const comment = await CommentModel.create({ post: postId, author, content, parentComment });

    // Notify post owner (new comment)
    const post = await PostModel.findById(postId);
    if (post && String(post.author) !== String(author)) {
      await NotificationService.create({
        recipient: post.author,
        sender: author,
        type: "comment",
        postId,
        commentId: comment._id,
        message: "Someone commented on your post",
      });
    }

    // Notify parent comment owner (reply)
    if (parentComment) {
      const parent = await CommentModel.findById(parentComment);
      if (parent && String(parent.author) !== String(author)) {
        await NotificationService.create({
          recipient: parent.author,
          sender: author,
          type: "reply",
          postId,
          commentId: parent._id,
          message: "Someone replied to your comment",
        });
      }
    }

    return comment;
  }

  // 🟢 Get comments for a post
  static async getCommentsByPost(postId) {
    const comments = await CommentModel.find({ post: postId, parentComment: null })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return Promise.all(
      comments.map(async (comment) => {
        const reactions = await ReactionService.countReactions({
          entityId: comment._id,
          entityType: "Comment",
        });
        const replies = await CommentModel.find({ parentComment: comment._id })
          .populate("author", "username email")
          .sort({ createdAt: 1 });

        return {
          ...comment.toObject(),
          reactions,
          replies,
        };
      })
    );
  }

  // 🟢 Update comment
  static async updateComment(commentId, author, content) {
    return CommentModel.findOneAndUpdate(
      { _id: commentId, author },
      { content },
      { new: true }
    );
  }

  // 🟢 Delete comment
  static async deleteComment(commentId, author) {
    return CommentModel.findOneAndDelete({ _id: commentId, author });
  }
}
