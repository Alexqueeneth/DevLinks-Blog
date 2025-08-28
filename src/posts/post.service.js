import { PostModel } from "../database/models/post.models.js";
import { CategoryModel } from "../database/models/category.models.js";
import { TagModel } from "../database/models/tag.models.js";

export class PostService {
  // ✅ Create Post with category/tag validation
  static async createPost(data, userId) {
    if (data.categories?.length > 0) {
      const validCategories = await CategoryModel.find({ _id: { $in: data.categories } });
      if (validCategories.length !== data.categories.length) {
        throw new Error("One or more categories are invalid");
      }
    }

    if (data.tags?.length > 0) {
      const validTags = await TagModel.find({ _id: { $in: data.tags } });
      if (validTags.length !== data.tags.length) {
        throw new Error("One or more tags are invalid");
      }
    }

    return PostModel.create({ ...data, author: userId });
  }

  // ✅ Get all posts
  static async getPosts() {
    return PostModel.find()
      .populate("author", "username email")
      .populate("categories", "name description")
      .populate("tags", "name")
      .populate("comments");
  }

  // ✅ Get one post
  static async getPostById(id) {
    return PostModel.findById(id)
      .populate("author", "username email")
      .populate("categories", "name description")
      .populate("tags", "name")
      .populate("comments");
  }

  // ✅ Update post with validation
  static async updatePost(id, data) {
    if (data.categories?.length > 0) {
      const validCategories = await CategoryModel.find({ _id: { $in: data.categories } });
      if (validCategories.length !== data.categories.length) {
        throw new Error("One or more categories are invalid");
      }
    }

    if (data.tags?.length > 0) {
      const validTags = await TagModel.find({ _id: { $in: data.tags } });
      if (validTags.length !== data.tags.length) {
        throw new Error("One or more tags are invalid");
      }
    }

    return PostModel.findByIdAndUpdate(id, data, { new: true })
      .populate("categories", "name")
      .populate("tags", "name");
  }

  // ✅ Delete post
  static async deletePost(id, userId) {
    return PostModel.findOneAndDelete({ _id: id, author: userId });
  }

  // ✅ Publish post
  static async publishPost(id, userId) {
    return PostModel.findOneAndUpdate(
      { _id: id, author: userId },
      { status: "published", publishedAt: new Date() },
      { new: true }
    );
  }

  // ✅ Schedule post
  static async schedulePost(id, userId, publishDate) {
    return PostModel.findOneAndUpdate(
      { _id: id, author: userId },
      { status: "scheduled", publishedAt: publishDate },
      { new: true }
    );
  }

  // ✅ Add reaction
  static async addReaction(postId, userId, type) {
    return PostModel.findByIdAndUpdate(
      postId,
      { $push: { reactions: { user: userId, type } } },
      { new: true }
    );
  }

  // ✅ Remove reaction
  static async removeReaction(postId, userId, type) {
    return PostModel.findByIdAndUpdate(
      postId,
      { $pull: { reactions: { user: userId, type } } },
      { new: true }
    );
  }

  // ✅ Get only published posts
  static async getPublishedPosts() {
    return PostModel.find({ status: "published" })
      .populate("author", "username email")
      .populate("categories", "name")
      .populate("tags", "name")
      .populate("comments");
  }
}
