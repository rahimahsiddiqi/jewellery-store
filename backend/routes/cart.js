const express = require('express');
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/cart/test
// @desc    Test cart endpoint
// @access  Public
router.get('/test', (req, res) => {
  res.json({ message: 'Cart API is working!', timestamp: new Date().toISOString() });
});

// @route   GET /api/cart
// @desc    Get cart (session-based)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get session ID from headers or create a new one
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';
    
    let cart = await Cart.findOne({ sessionId }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        total: 0,
        couponCode: ''
      });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Public
router.post('/add', [
  body('productId', 'Product ID is required').not().isEmpty(),
  body('quantity', 'Quantity must be at least 1').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity, selectedOptions } = req.body;
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';

    // Check if product exists and is active
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (!product.isActive) {
      return res.status(404).json({ message: 'Product not available' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Get or create cart
    let cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        total: 0,
        couponCode: ''
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].selectedOptions = selectedOptions;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        selectedOptions,
        price: product.price
      });
    }

    // Recalculate cart totals
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.tax = 0; // No tax
    cart.shipping = 200; // Fixed shipping cost
    cart.total = cart.subtotal + cart.shipping - cart.discount;

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/cart/update/:itemId
// @desc    Update cart item quantity
// @access  Public
router.put('/update/:itemId', [
  body('quantity', 'Quantity must be at least 1').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { quantity } = req.body;
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check stock
    const product = await Product.findById(cart.items[itemIndex].product);
    if (product && product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    cart.items[itemIndex].quantity = quantity;

    // Recalculate cart totals
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.tax = 0;
    cart.shipping = 200;
    cart.total = cart.subtotal + cart.shipping - cart.discount;

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
// @access  Public
router.delete('/remove/:itemId', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

    // Recalculate cart totals
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.tax = 0;
    cart.shipping = 200;
    cart.total = cart.subtotal + cart.shipping - cart.discount;

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Public
router.delete('/clear', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.subtotal = 0;
    cart.tax = 0;
    cart.shipping = 0;
    cart.discount = 0;
    cart.total = 0;
    cart.couponCode = '';

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cart/apply-coupon
// @desc    Apply coupon code to cart
// @access  Public
router.post('/apply-coupon', [
  body('couponCode', 'Coupon code is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { couponCode } = req.body;
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Simple coupon logic
    if (couponCode.toUpperCase() === 'SAVE10') {
      cart.discount = cart.subtotal * 0.1; // 10% discount
      cart.couponCode = couponCode;
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      cart.shipping = 0;
      cart.couponCode = couponCode;
    } else {
      return res.status(400).json({ message: 'Invalid coupon code' });
    }

    cart.total = cart.subtotal + cart.shipping - cart.discount;
    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error('Apply coupon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cart/remove-coupon
// @desc    Remove coupon from cart
// @access  Public
router.delete('/remove-coupon', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || req.session?.id || 'default-session';

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.discount = 0;
    cart.couponCode = '';
    cart.shipping = 200; // Fixed shipping cost
    cart.total = cart.subtotal + cart.shipping - cart.discount;

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error('Remove coupon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 