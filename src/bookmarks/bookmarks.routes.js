import { Router } from "express";
import { BookmarksController } from "./bookmarks.controller.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// add/remove bookmarks
router.post("/:postId", AuthMiddleware.authenticate, BookmarksController.addBookmark);
router.delete("/:postId", AuthMiddleware.authenticate, BookmarksController.removeBookmark);

// list user bookmarks
router.get("/", AuthMiddleware.authenticate, BookmarksController.getUserBookmarks);

export default router;
