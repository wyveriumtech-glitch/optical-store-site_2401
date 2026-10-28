const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    code: { type: String, required: true, uppercase: true, trim: true },
    discountPercentage: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    minPurchase: { type: Number, default: 0 },
    validTill: { type: String, default: 'Limited Time' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Offer || mongoose.model('Offer', offerSchema);
