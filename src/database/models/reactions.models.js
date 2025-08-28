import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "dislike", "love", "laugh", "angry"],
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

// A user should not react the same way twice on the same post/comment
reactionSchema.index({ user: 1, post: 1, type: 1 }, { unique: true, sparse: true });
reactionSchema.index({ user: 1, comment: 1, type: 1 }, { unique: true, sparse: true });

export const ReactionModel = mongoose.model("Reaction", reactionSchema);
