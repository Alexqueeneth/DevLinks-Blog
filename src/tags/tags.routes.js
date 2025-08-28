import { Router } from "express";
import { TagController } from "./tag.controller.js";
import { validate } from "../common/middleware/validation.middleware.js";
import { createTagSchema, updateTagSchema } from "./tag.validation.js";

const router = Router();

router.post("/", validate(createTagSchema), TagController.create);
router.get("/", TagController.list);
router.put("/:id", validate(updateTagSchema), TagController.update);
router.delete("/:id", TagController.delete);

export default router;
