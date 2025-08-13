const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

const router = express.Router();

// @route   POST /api/payments/create-payment-intent
// @desc    Create a payment intent for Stripe
// @access  Public
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'pkr', customer_email } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // For PKR, we need to use 'pkr' as currency code
    // Note: Stripe supports PKR but amounts are in smallest currency unit (paisa)
    const currencyCode = currency === 'pkr' ? 'pkr' : currency;
    const amountInSmallestUnit = currencyCode === 'pkr' ? Math.round(amount * 100) : Math.round(amount * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: currencyCode,
      metadata: {
        customer_email: customer_email
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Payment processing error' });
  }
});

// @route   POST /api/payments/confirm-payment
// @desc    Confirm payment and create order
// @access  Public
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Create order with payment info
    const order = new Order({
      ...orderData,
      stripePaymentIntentId: paymentIntentId,
      stripeCustomerId: paymentIntent.customer || null,
      status: 'processing'
    });

    order.calculateTotals();
    await order.save();

    res.json({
      success: true,
      order: order,
      message: 'Payment confirmed and order created'
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Payment confirmation error' });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update order status if needed
      if (paymentIntent.metadata.orderId) {
        await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
          status: 'processing'
        });
      }
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      
      // Update order status to failed
      if (failedPayment.metadata.orderId) {
        await Order.findByIdAndUpdate(failedPayment.metadata.orderId, {
          status: 'cancelled'
        });
      }
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router; 