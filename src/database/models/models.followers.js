import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // the one following
    following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // the one being followed
  },
  { timestamps: true }
);

followerSchema.index({ follower: 1, following: 1 }, { unique: true });

export const FollowerModel = mongoose.model("Follower", followerSchema);
