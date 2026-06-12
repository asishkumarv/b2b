const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const auth = require("../middleware/auth");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "b2b_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "svg"],
  },
});

const upload = multer({ storage: storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }
    // req.file.path contains the secure URL returned by Cloudinary
    res.json({ imageUrl: req.file.path });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).send("Server Error during upload");
  }
});

module.exports = router;
