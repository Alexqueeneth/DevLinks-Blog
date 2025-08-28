import { TagModel } from "../database/models/tags.models.js";

export class TagService {
  static async createTag(data) {
    return TagModel.create(data);
  }

  static async getTags() {
    return TagModel.find();
  }

  static async getTagById(id) {
    return TagModel.findById(id);
  }

  static async updateTag(id, data) {
    return TagModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteTag(id) {
    return TagModel.findByIdAndDelete(id);
  }
}
