const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Blog } = require("../models");

// Get all blogs (Public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get blog by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a blog (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a blog (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    let blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog = await blog.update(req.body);
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a blog (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.destroy();
    res.json({ message: "Blog removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
