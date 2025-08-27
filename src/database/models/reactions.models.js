import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["like", "dislike"], required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    entityType: { type: String, enum: ["Post", "Comment"], required: true }
  },
  { timestamps: true }
);

reactionSchema.index({ user: 1, entityId: 1, entityType: 1 }, { unique: true }); // one reaction per user/entity

export const ReactionModel = mongoose.model("Reaction", reactionSchema);
