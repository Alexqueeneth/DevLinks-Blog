import { MediaService } from "./media.service.js";
import { sendResponse } from "../common/utils.common.js";

export class MediaController {
  static async upload(req, res, next) {
    try {
      if (!req.file) return sendResponse(res, 400, false, "No file uploaded");
      const media = await MediaService.uploadMedia(
        {
          url: `/uploads/${req.file.filename}`,
          type: req.file.mimetype.startsWith("image") ? "image" : "file",
          onModel: req.body.onModel,
          relatedTo: req.body.relatedTo,
        },
        req.user.id
      );
      return sendResponse(res, 201, true, "Media uploaded", media);
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const media = await MediaService.getMediaById(req.params.id);
      if (!media) return sendResponse(res, 404, false, "Media not found");
      return sendResponse(res, 200, true, "Media fetched", media);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const media = await MediaService.deleteMedia(req.params.id, req.user.id);
      return sendResponse(res, 200, true, "Media deleted", media);
    } catch (err) {
      next(err);
    }
  }
}
