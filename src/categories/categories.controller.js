import { CategoryService } from "./categories.service.js";
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

  static async update(req, res, next) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      if (!category) {
        return sendResponse(res, 404, false, "Category not found");
      }
      return sendResponse(res, 200, true, "Category updated", category);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      if (!category) {
        return sendResponse(res, 404, false, "Category not found");
      }
      return sendResponse(res, 200, true, "Category deleted");
    } catch (err) {
      next(err);
    }
  }
}
