import { Router } from "express";
import { SearchController } from "./search.controller.js";
import { validate } from "../common/middleware/validation.middleware.js";
import { searchPostsSchema, searchUsersSchema, searchCommentsSchema } from "./search.validation.js";

const router = Router();

router.get("/posts", validate(searchPostsSchema), SearchController.searchPosts);
router.get("/users", validate(searchUsersSchema), SearchController.searchUsers);
router.get("/comments", validate(searchCommentsSchema), SearchController.searchComments);

export default router;
