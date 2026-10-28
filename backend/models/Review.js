const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    location: { type: String, default: 'Store Customer' },
    avatar: { type: String, default: '' },
    framePurchased: { type: String, default: 'Gold Titanium Aviator' },
    beforeAfterImages: [{ type: String }],
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
