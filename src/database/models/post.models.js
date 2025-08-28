import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },

    // relations
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

    // reactions
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: {
          type: String,
          enum: ["like", "love", "dislike", "clap", "insightful"],
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // publishing
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", PostSchema);
