const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories (used for product filtering)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select('name slug')
      .sort('sortOrder');

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 