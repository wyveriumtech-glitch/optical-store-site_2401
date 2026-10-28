const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Appointment = require('../models/Appointment');
const Offer = require('../models/Offer');
const Review = require('../models/Review');
const { getDbStatus } = require('../config/db');
const memoryStore = require('../services/storage');
const { protect } = require('../middleware/auth');

// GET /api/stats (Admin dashboard metrics)
router.get('/', protect, async (req, res) => {
  try {
    if (getDbStatus()) {
      const [totalAppointments, pendingAppointments, confirmedAppointments, totalProducts, activeOffers, totalReviews, recentAppointments] =
        await Promise.all([
          Appointment.countDocuments(),
          Appointment.countDocuments({ status: 'Pending' }),
          Appointment.countDocuments({ status: 'Confirmed' }),
          Product.countDocuments(),
          Offer.countDocuments({ active: true }),
          Review.countDocuments(),
          Appointment.find().sort({ createdAt: -1 }).limit(5),
        ]);

      return res.json({
        success: true,
        data: {
          totalAppointments,
          pendingAppointments,
          confirmedAppointments,
          totalProducts,
          activeOffers,
          totalReviews,
          recentAppointments,
        },
      });
    } else {
      const stats = memoryStore.getStats();
      return res.json({ success: true, data: stats });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
