
import express from "express";
import upload from "./upload.middleware.js";

const router = express.Router();

// GET endpoint for uploads (can be used to list uploads or show upload info)
router.get("/", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Upload service is available",
      endpoints: {
        upload: "POST /api/uploads/upload"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

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
