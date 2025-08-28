import { BookmarkModel } from "../database/models/bookmarks.models.js";

export class BookmarksService {
  static async addBookmark(userId, postId) {
    return BookmarkModel.create({ user: userId, post: postId });
  }

  static async removeBookmark(userId, postId) {
    return BookmarkModel.findOneAndDelete({ user: userId, post: postId });
  }

  static async getUserBookmarks(userId) {
    return BookmarkModel.find({ user: userId }).populate("post");
  }
}
