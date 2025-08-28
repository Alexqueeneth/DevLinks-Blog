import { CategoryService } from "./category.service.js";
import { sendResponse } from "../common/utils.common.js";

export class CategoryController {
  static async create(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return sendResponse(res, 201, true, "Category created", category);
    } catch (err) {
      next(err);
    }
  }

  static async list(req, res, next) {
    try {
      const categories = await CategoryService.getCategories();
      return sendResponse(res, 200, true, "Categories fetched", categories);
    } catch (err) {
      next(err);
    }
  }
}
