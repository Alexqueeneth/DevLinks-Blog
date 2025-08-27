import { Post } from "./post.model.js";
import { User } from "../users/user.model.js";

export class PostService {
  static async createPost(data, userId) {
    const post = new Post({ ...data, author: userId });
    return await post.save();
  }

  static async getAllPosts() {
    return await Post.find().populate("author", "name email");
  }

  static async getPostById(id) {
    return await Post.findById(id).populate("author", "name email");
  }

  static async updatePost(id, data, userId) {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");

    if (post.author.toString() !== userId.toString()) {
      throw new Error("Unauthorized to update this post");
    }

    Object.assign(post, data);
    return await post.save();
  }

  static async deletePost(id, user) {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");

    if (post.author.toString() !== user.id && user.role !== "admin") {
      throw new Error("Unauthorized to delete this post");
    }

    await post.deleteOne();
    return post;
  }

  static async likePost(id, userId) {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    return post;
  }

  static async unlikePost(id, userId) {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");

    post.likes = post.likes.filter((uid) => uid.toString() !== userId.toString());
    await post.save();
    return post;
  }
}
