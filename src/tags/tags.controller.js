import { TagService } from "./tags.service.js";
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

  static async update(req, res, next) {
    try {
      const tag = await TagService.updateTag(req.params.id, req.body);
      if (!tag) {
        return sendResponse(res, 404, false, "Tag not found");
      }
      return sendResponse(res, 200, true, "Tag updated", tag);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const tag = await TagService.deleteTag(req.params.id);
      if (!tag) {
        return sendResponse(res, 404, false, "Tag not found");
      }
      return sendResponse(res, 200, true, "Tag deleted");
    } catch (err) {
      next(err);
    }
  }
}
