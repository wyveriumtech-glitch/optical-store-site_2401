const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const { getDbStatus } = require('../config/db');
const memoryStore = require('../services/storage');
const { protect } = require('../middleware/auth');

// GET /api/offers
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;

    if (getDbStatus()) {
      const query = all === 'true' ? {} : { active: true };
      const offers = await Offer.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: offers.length, data: offers });
    } else {
      const offers = memoryStore.getOffers(all !== 'true');
      return res.json({ success: true, count: offers.length, data: offers });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/offers (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const offerData = req.body;
    if (!offerData.title || !offerData.code) {
      return res.status(400).json({ success: false, message: 'Title and code are required' });
    }

    if (getDbStatus()) {
      const created = await Offer.create(offerData);
      return res.status(201).json({ success: true, data: created });
    } else {
      const created = memoryStore.addOffer(offerData);
      return res.status(201).json({ success: true, data: created });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/offers/:id (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const updated = await Offer.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Offer not found' });
      return res.json({ success: true, data: updated });
    } else {
      const updated = memoryStore.updateOffer(id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: 'Offer not found' });
      return res.json({ success: true, data: updated });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/offers/:id (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Offer.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Offer not found' });
      return res.json({ success: true, message: 'Offer deleted' });
    } else {
      const ok = memoryStore.deleteOffer(id);
      if (!ok) return res.status(404).json({ success: false, message: 'Offer not found' });
      return res.json({ success: true, message: 'Offer deleted' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
