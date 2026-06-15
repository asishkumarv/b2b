const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { PageContent } = require("../models");

// Get all content (Public)
router.get("/", async (req, res) => {
  try {
    const contents = await PageContent.findAll();
    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update or Create content (Admin only)
router.post("/", auth, async (req, res) => {
  const { pageKey, title, description, imageUrl, data } = req.body;

  try {
    let content = await PageContent.findOne({ where: { pageKey } });

    if (content) {
      content.title = title;
      content.description = description;
      content.imageUrl = imageUrl;
      if (data !== undefined) content.data = data;
      await content.save();
    } else {
      content = await PageContent.create({
        pageKey,
        title,
        description,
        imageUrl,
        data: data !== undefined ? data : {}
      });
    }

    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
