import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who follows
    following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who is followed
  },
  { timestamps: true }
);

// prevent duplicate follows
followerSchema.index({ follower: 1, following: 1 }, { unique: true });

export const FollowerModel = mongoose.model("Follower", followerSchema);
