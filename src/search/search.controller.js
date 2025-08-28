import { SearchService } from "./search.service.js";
import { sendResponse } from "../common/utils.common.js";

export class SearchController {
  static async searchPosts(req, res, next) {
    try {
      const results = await SearchService.searchPosts(req.query);
      return sendResponse(res, 200, true, "Posts search results", results);
    } catch (err) {
      next(err);
    }
  }

  static async searchUsers(req, res, next) {
    try {
      const results = await SearchService.searchUsers(req.query);
      return sendResponse(res, 200, true, "Users search results", results);
    } catch (err) {
      next(err);
    }
  }

  static async searchComments(req, res, next) {
    try {
      const results = await SearchService.searchComments(req.query);
      return sendResponse(res, 200, true, "Comments search results", results);
    } catch (err) {
      next(err);
    }
  }
}
