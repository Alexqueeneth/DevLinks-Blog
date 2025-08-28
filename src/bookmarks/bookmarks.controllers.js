import { BookmarksService } from "./booksmarks.service.js";
import { sendResponse } from "../common/utils.common.js";

export class BookmarksController {
  static async addBookmark(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      const bookmark = await BookmarksService.addBookmark(userId, postId);
      return sendResponse(res, 201, true, "Post bookmarked successfully", bookmark);
    } catch (error) {
      next(error);
    }
  }

  static async removeBookmark(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      await BookmarksService.removeBookmark(userId, postId);
      return sendResponse(res, 200, true, "Bookmark removed successfully");
    } catch (error) {
      next(error);
    }
  }

  static async getUserBookmarks(req, res, next) {
    try {
      const userId = req.user.id;
      const bookmarks = await BookmarksService.getUserBookmarks(userId);
      return sendResponse(res, 200, true, "Bookmarks fetched successfully", bookmarks);
    } catch (error) {
      next(error);
    }
  }
}
