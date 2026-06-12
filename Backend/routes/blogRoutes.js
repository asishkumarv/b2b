const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Blog } = require("../models");

const generateSlug = async (title, blogId = null) => {
  const baseSlug = title.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await Blog.findOne({ where: { slug } });
    if (!existing || (blogId && existing.id === blogId)) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
};

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

// Get blog by ID or Slug (Public)
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    let blog;
    if (isUUID) {
      blog = await Blog.findByPk(identifier);
    } else {
      blog = await Blog.findOne({ where: { slug: identifier } });
    }

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
    if (req.body.title) {
      req.body.slug = await generateSlug(req.body.title);
    }
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

    if ((req.body.title && req.body.title !== blog.title) || (req.body.title && !blog.slug)) {
      req.body.slug = await generateSlug(req.body.title, blog.id);
    }

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
