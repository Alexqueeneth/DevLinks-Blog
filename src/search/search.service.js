import { PostModel } from "../database/models/post.models.js";
import { UserModel } from "../database/models/user.models.js";
import { CommentModel } from "../database/models/comment.models.js";

export class SearchService {
  static async searchPosts({ query, tags, categories, author, sort, fromDate, toDate }) {
    const filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ];
    }

    if (tags?.length) filter.tags = { $in: tags };
    if (categories?.length) filter.categories = { $in: categories };
    if (author) filter.author = author;

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    let q = PostModel.find(filter).populate("author tags categories");

    if (sort === "newest") q = q.sort({ createdAt: -1 });
    if (sort === "oldest") q = q.sort({ createdAt: 1 });

    return q.exec();
  }

  static async searchUsers({ query }) {
    if (!query) return [];

    return UserModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { bio: { $regex: query, $options: "i" } },
      ],
    });
  }

  static async searchComments({ query, postId }) {
    if (!query) return [];

    const filter = { content: { $regex: query, $options: "i" } };
    if (postId) filter.post = postId;

    return CommentModel.find(filter).populate("user post");
  }
}
