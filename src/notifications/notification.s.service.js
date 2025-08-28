import { NotificationModel } from "../database/models/notifications.models.js";

export class NotificationService {
  static async create({ recipient, sender, type, postId, commentId, message }) {
    const notification = new NotificationModel({
      recipient,
      sender,
      type,
      post: postId,
      comment: commentId,
      message,
    });
    return notification.save();
  }

  static async markAsRead(notificationId, userId) {
    return NotificationModel.findOneAndUpdate(
      { _id: notificationId, recipient: userId },
      { read: true },
      { new: true }
    );
  }

  static async list(userId) {
    return NotificationModel.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "username email");
  }

  static async unreadCount(userId) {
    return NotificationModel.countDocuments({ recipient: userId, read: false });
  }
}
