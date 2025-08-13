const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', [
  body('customer.name').notEmpty().withMessage('Customer name is required'),
  body('customer.email').isEmail().withMessage('Valid email is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be positive')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customer, items, stripePaymentIntentId, stripeCustomerId } = req.body;

    // Validate products exist and get current prices
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const productId = item.product._id || item.product;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ message: `Product ${productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      orderItems.push({
        product: productId,
        quantity: item.quantity,
        price: item.price || product.price,
        selectedOptions: item.selectedOptions || {}
      });

      subtotal += (item.price || product.price) * item.quantity;
    }

    // Create order
    const order = new Order({
      customer,
      items: orderItems,
      subtotal,
      stripePaymentIntentId,
      stripeCustomerId
    });

    // Calculate totals
    order.calculateTotals();

    await order.save();

    // Update product stock
    for (const item of items) {
      const productId = item.product._id || item.product;
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Public
router.put('/:id/status', [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, trackingNumber, estimatedDelivery } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        trackingNumber, 
        estimatedDelivery,
        ...(status === 'shipped' && { shippedAt: new Date() }),
        ...(status === 'delivered' && { deliveredAt: new Date() })
      },
      { new: true }
    ).populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 