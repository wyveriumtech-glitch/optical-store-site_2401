const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { getDbStatus } = require('../config/db');
const memoryStore = require('../services/storage');
const { protect } = require('../middleware/auth');

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    if (getDbStatus()) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: blogs.length, data: blogs });
    } else {
      const blogs = memoryStore.getBlogs();
      return res.json({ success: true, count: blogs.length, data: blogs });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/blogs/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    if (getDbStatus()) {
      let blog = null;
      if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await Blog.findById(slug);
      }
      if (!blog) {
        blog = await Blog.findOne({ slug });
      }
      if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' });
      return res.json({ success: true, data: blog });
    } else {
      const blog = memoryStore.getBlogBySlug(slug);
      if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' });
      return res.json({ success: true, data: blog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/blogs (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const blogData = req.body;
    if (!blogData.title || !blogData.content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    if (!blogData.slug) {
      blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (getDbStatus()) {
      const created = await Blog.create(blogData);
      return res.status(201).json({ success: true, data: created });
    } else {
      const created = memoryStore.addBlog(blogData);
      return res.status(201).json({ success: true, data: created });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/blogs/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Blog.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Blog not found' });
      return res.json({ success: true, message: 'Blog deleted' });
    } else {
      const ok = memoryStore.deleteBlog(id);
      if (!ok) return res.status(404).json({ success: false, message: 'Blog not found' });
      return res.json({ success: true, message: 'Blog deleted' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
