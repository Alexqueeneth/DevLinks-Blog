
import express from "express";
import upload from "./upload.middleware.js";

const router = express.Router();


router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.json({
      success: true,
      message: "File uploaded successfully!",
      fileUrl: req.file.path, // CLOUDINARY_URL=cloudinary://856271984968469:8o1iNX7HQqxsLpeDkwAO9jnFSM@dzmk7jevr
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
