const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, default: 'Eye Care & Tech' },
    author: {
      name: { type: String, default: 'Dr. Sarah Mitchell, Chief Optometrist' },
      role: { type: String, default: 'Senior Specialist' },
      avatar: { type: String, default: '' },
    },
    readTime: { type: String, default: '4 min read' },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
