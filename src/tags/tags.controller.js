import { TagService } from "./tag.service.js";
import { sendResponse } from "../common/utils.common.js";

export class TagController {
  static async create(req, res, next) {
    try {
      const tag = await TagService.createTag(req.body);
      return sendResponse(res, 201, true, "Tag created", tag);
    } catch (err) {
      next(err);
    }
  }

  static async list(req, res, next) {
    try {
      const tags = await TagService.getTags();
      return sendResponse(res, 200, true, "Tags fetched", tags);
    } catch (err) {
      next(err);
    }
  }
}
