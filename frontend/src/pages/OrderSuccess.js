import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <FiCheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl font-serif text-gray-800 mb-4"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          Thank you for your purchase! Your order has been placed successfully and will be processed soon.
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-50 rounded-lg p-4 mb-8"
        >
          <h3 className="font-medium text-gray-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">

            <li>• Your order will be processed within 1-2 business days</li>
            <li>• You'll receive tracking information once shipped</li>
            <li>• Estimated delivery: 3-5 business days</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3"
        >
          <Link
            to="/"
            className="block w-full bg-gradient-to-r from-[#B98989] to-[#533E3E] text-white py-3 px-6 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            <FiHome className="inline mr-2" />
            Continue Shopping
          </Link>
          
          <Link
            to="/products"
            className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            <FiShoppingBag className="inline mr-2" />
            Browse More Products
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess; 