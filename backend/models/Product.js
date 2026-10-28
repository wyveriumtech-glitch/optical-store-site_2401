const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Eyeglasses', 'Sunglasses', 'Contact Lenses', 'Kids', 'Accessories'],
      default: 'Eyeglasses',
    },
    frameShape: {
      type: String,
      enum: ['Square', 'Round', 'Aviator', 'Cat-Eye', 'Geometric', 'Wayfarer', 'Rimless', 'Clubmaster'],
      default: 'Square',
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex', 'Kids'],
      default: 'Unisex',
    },
    color: { type: String, default: 'Gold / Black' },
    atelier: { type: String, default: 'Atelier Signature' },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    images: [{ type: String }],
    specs: {
      lensWidth: { type: Number, default: 52 },
      bridgeWidth: { type: Number, default: 18 },
      templeLength: { type: Number, default: 145 },
      frameMaterial: { type: String, default: 'Titanium & Acetate' },
      weight: { type: String, default: '18g (Ultra Lightweight)' },
      rimType: { type: String, default: 'Full Rim' },
    },
    prescriptionCompatible: { type: Boolean, default: true },
    stock: { type: Number, default: 25 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 24 },
    description: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
