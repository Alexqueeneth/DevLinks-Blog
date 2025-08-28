import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video", "file"], default: "image" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    relatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel", // can be Post, Comment, User, etc.
    },
    onModel: {
      type: String,
      enum: ["Post", "Comment", "User"],
    },
  },
  { timestamps: true }
);

export const MediaModel = mongoose.model("Media", mediaSchema);
