import { Router } from "express";
import { CategoryController } from "./categories.controller.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./categories.validation.js";

const router = Router();

router.post("/", ValidationMiddleware.validate(createCategorySchema), CategoryController.create);
router.get("/", CategoryController.list);
router.put("/:id", ValidationMiddleware.validate(updateCategorySchema), CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
