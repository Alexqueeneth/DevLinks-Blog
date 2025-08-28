import { Router } from "express";
import { BookmarksController } from "./bookmarks.controllers.js";
import { AuthMiddleware } from "../common/middleware/auth.middleware.js";

const router = Router();

// add/remove bookmarks
router.post("/:postId", AuthMiddleware.verifyToken, BookmarksController.addBookmark);
router.delete("/:postId", AuthMiddleware.verifyToken, BookmarksController.removeBookmark);

// list user bookmarks
router.get("/", AuthMiddleware.verifyToken, BookmarksController.getUserBookmarks);

export default router;
