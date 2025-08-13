import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import stripePromise from '../config/stripe';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total } = useCart();

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Cart
            </button>
            <h1 className="text-2xl font-serif text-gray-800">Checkout</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-[#C3ACAC] py-4 mt-16"
      >
        <div className="text-center">
          <p className="text-[#261A1A] text-lg font-medium">
            Fixed Shipping Cost: Rs. 200
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout; 