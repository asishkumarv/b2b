const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }
    
    // Convert buffer to base64
    const base64String = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64String}`;
    
    res.json({ imageUrl });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).send("Server Error during upload");
  }
});

module.exports = router;
