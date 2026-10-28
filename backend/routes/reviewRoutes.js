const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { getDbStatus } = require('../config/db');
const memoryStore = require('../services/storage');
const { protect } = require('../middleware/auth');

// GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;

    if (getDbStatus()) {
      const query = all === 'true' ? {} : { verified: true };
      const reviews = await Review.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: reviews.length, data: reviews });
    } else {
      const reviews = memoryStore.getReviews(all !== 'true');
      return res.json({ success: true, count: reviews.length, data: reviews });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews (Client submit review)
router.post('/', async (req, res) => {
  try {
    const { customerName, rating, comment, location, framePurchased, avatar, beforeAfterImages } = req.body;
    if (!customerName || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Name, rating and review text are required' });
    }

    const reviewData = {
      customerName,
      rating: Number(rating),
      comment,
      location: location || 'Customer',
      framePurchased: framePurchased || 'Eyelitz Designer Frame',
      avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customerName)}`,
      beforeAfterImages: beforeAfterImages || [],
      verified: true, // auto-verified for demonstration ease
    };

    if (getDbStatus()) {
      const created = await Review.create(reviewData);
      return res.status(201).json({ success: true, data: created });
    } else {
      const created = memoryStore.addReview(reviewData);
      return res.status(201).json({ success: true, data: created });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/reviews/:id/verify (Admin)
router.put('/:id/verify', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const rev = await Review.findById(id);
      if (!rev) return res.status(404).json({ success: false, message: 'Review not found' });
      rev.verified = !rev.verified;
      await rev.save();
      return res.json({ success: true, data: rev });
    } else {
      const updated = memoryStore.toggleVerifyReview(id);
      if (!updated) return res.status(404).json({ success: false, message: 'Review not found' });
      return res.json({ success: true, data: updated });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/reviews/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Review.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Review not found' });
      return res.json({ success: true, message: 'Review deleted' });
    } else {
      const idx = memoryStore.reviews.findIndex((r) => r._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Review not found' });
      memoryStore.reviews.splice(idx, 1);
      return res.json({ success: true, message: 'Review deleted' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
