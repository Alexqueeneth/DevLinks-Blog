import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { validate } from "../common/middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";

const router = Router();

router.post("/", validate(createCategorySchema), CategoryController.create);
router.get("/", CategoryController.list);
router.put("/:id", validate(updateCategorySchema), CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
