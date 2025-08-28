import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["comment", "reply", "reaction"],
      required: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", notificationSchema);
