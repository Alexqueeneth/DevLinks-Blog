import { Router } from "express";
import { SearchController } from "./search.controller.js";
import { ValidationMiddleware } from "../common/middleware/validation.middleware.js";
import { searchPostsSchema, searchUsersSchema, searchCommentsSchema } from "./search.validation.js";

const router = Router();

router.get("/posts", ValidationMiddleware.validate(searchPostsSchema), SearchController.searchPosts);
router.get("/users", ValidationMiddleware.validate(searchUsersSchema), SearchController.searchUsers);
router.get("/comments", ValidationMiddleware.validate(searchCommentsSchema), SearchController.searchComments);

export default router;
