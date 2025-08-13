const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  brand: {
    type: String,
    trim: true
  },
  // Jewelry specific fields
  material: {
    type: String,
    enum: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold', 'Sterling Silver', 'Other'],
    required: true
  },
  gemstone: {
    type: String,
    enum: ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Opal', 'Amethyst', 'None', 'Other']
  },
  weight: {
    type: Number,
    min: 0
  },
  weightUnit: {
    type: String,
    enum: ['grams', 'carats', 'ounces'],
    default: 'grams'
  },
  size: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  style: {
    type: String,
    enum: ['Classic', 'Modern', 'Vintage', 'Contemporary', 'Minimalist', 'Bold', 'Elegant', 'Casual']
  },
  occasion: {
    type: String,
    enum: ['Wedding', 'Engagement', 'Anniversary', 'Birthday', 'Holiday', 'Everyday', 'Special Occasion']
  },
  // Inventory
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    trim: true
  },
  // SEO and visibility
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  // Ratings and reviews
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from name
productSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  next();
});

// Generate SKU
productSchema.pre('save', function(next) {
  if (!this.isModified('name') && this.sku) return next();
  
  if (!this.sku) {
    const timestamp = Date.now().toString().slice(-6);
    this.sku = `${this.name.substring(0, 3).toUpperCase()}${timestamp}`;
  }
  
  next();
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema); 