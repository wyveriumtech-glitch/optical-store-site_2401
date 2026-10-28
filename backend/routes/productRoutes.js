const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getDbStatus } = require('../config/db');
const memoryStore = require('../services/storage');
const { protect } = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, frameShape, gender, featured, search, minPrice, maxPrice } = req.query;

    if (getDbStatus()) {
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (frameShape && frameShape !== 'All') query.frameShape = frameShape;
      if (gender && gender !== 'All') {
        query.$or = [{ gender: gender }, { gender: 'Unisex' }];
      }
      if (featured !== undefined) query.featured = featured === 'true';
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: products.length, data: products });
    } else {
      const products = memoryStore.getProducts(req.query);
      return res.json({ success: true, count: products.length, data: products });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      if (!product) {
        product = await Product.findOne({ slug: id });
      }
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, data: product });
    } else {
      const product = memoryStore.getProductById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, data: product });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.name || !productData.price) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }

    if (!productData.slug) {
      productData.slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (getDbStatus()) {
      const newProduct = await Product.create(productData);
      return res.status(201).json({ success: true, data: newProduct });
    } else {
      const created = memoryStore.addProduct(productData);
      return res.status(201).json({ success: true, data: created });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (getDbStatus()) {
      let updated = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
      }
      if (!updated) {
        updated = await Product.findOneAndUpdate({ slug: id }, updateData, { new: true });
      }
      if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: updated });
    } else {
      const updated = memoryStore.updateProduct(id, updateData);
      if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: updated });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      let deleted = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        deleted = await Product.findByIdAndDelete(id);
      }
      if (!deleted) {
        deleted = await Product.findOneAndDelete({ slug: id });
      }
      if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, message: 'Product removed successfully' });
    } else {
      const success = memoryStore.deleteProduct(id);
      if (!success) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, message: 'Product removed successfully' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
