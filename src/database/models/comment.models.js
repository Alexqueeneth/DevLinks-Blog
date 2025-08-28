import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // for replies
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", commentSchema);
