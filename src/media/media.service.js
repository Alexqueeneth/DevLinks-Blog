import { MediaModel } from "../database/models/media.models.js";

export class MediaService {
  static async uploadMedia(data, userId) {
    return MediaModel.create({ ...data, uploadedBy: userId });
  }

  static async getMediaById(id) {
    return MediaModel.findById(id).populate("uploadedBy", "username email");
  }

  static async deleteMedia(id, userId) {
    const media = await MediaModel.findById(id);
    if (!media) throw new Error("Media not found");
    if (String(media.uploadedBy) !== String(userId)) {
      throw new Error("Not authorized to delete this media");
    }
    await media.remove();
    return media;
  }
}
