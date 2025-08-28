import { CategoryModel } from "../database/models/categories.models.js";

export class CategoryService {
  static async createCategory(data) {
    return CategoryModel.create(data);
  }

  static async getCategories() {
    return CategoryModel.find();
  }

  static async getCategoryById(id) {
    return CategoryModel.findById(id);
  }

  static async updateCategory(id, data) {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteCategory(id) {
    return CategoryModel.findByIdAndDelete(id);
  }
}
