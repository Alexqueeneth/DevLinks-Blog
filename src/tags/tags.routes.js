import { Router } from "express";
import { TagController } from "./tags.controller.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { createTagSchema, updateTagSchema } from "./tags.validation.js";

const router = Router();

router.post("/", ValidationMiddleware.validate(createTagSchema), TagController.create);
router.get("/", TagController.list);
router.put("/:id", ValidationMiddleware.validate(updateTagSchema), TagController.update);
router.delete("/:id", TagController.delete);

export default router;
