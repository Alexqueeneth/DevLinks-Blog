import { NotificationService } from "./notifications.service.js";
import { sendResponse } from "../common/utils.common.js";

export class NotificationController {
  static async getAll(req, res, next) {
    try {
      const notifications = await NotificationService.list(req.user.id);
      return sendResponse(res, 200, true, "Notifications fetched", notifications);
    } catch (err) {
      next(err);
    }
  }

  static async getUnreadCount(req, res, next) {
    try {
      const count = await NotificationService.unreadCount(req.user.id);
      return sendResponse(res, 200, true, "Unread count fetched", { count });
    } catch (err) {
      next(err);
    }
  }

  static async markRead(req, res, next) {
    try {
      const notification = await NotificationService.markAsRead(
        req.params.id,
        req.user.id
      );
      return sendResponse(res, 200, true, "Notification marked as read", notification);
    } catch (err) {
      next(err);
    }
  }
}
