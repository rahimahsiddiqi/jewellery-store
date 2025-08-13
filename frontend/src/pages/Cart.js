import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowLeft, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { 
    items, 
    total, 
    subtotal, 
    shipping, 
    discount, 
    loading,
    updateCartItem, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="text-white text-lg">Loading cart...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FiShoppingBag className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-serif text-white mb-4">Shopping Cart</h1>
              <p className="text-white text-lg mb-8">Your cart is currently empty</p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-white text-[#8B6B6B] rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-between items-center mb-8"
            >
              <h1 className="text-4xl font-serif text-white">Shopping Cart</h1>
              <button
                onClick={handleClearCart}
                className="text-white hover:text-red-300 transition-colors flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Clear Cart
              </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  {items.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-white bg-opacity-10 rounded-lg p-6 flex items-center space-x-4"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.product?.images?.[0] || '/images/ring-home.png'}
                          alt={item.product?.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-lg">{item.product?.name}</h3>
                        <p className="text-white text-sm opacity-80">
                          {item.selectedOptions?.size && `Size: ${item.selectedOptions.size}`}
                        </p>
                        <p className="text-white font-bold">Rs. {item.price?.toLocaleString()}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="w-8 h-8 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="w-8 h-8 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-white hover:text-red-300 transition-colors p-2"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white bg-opacity-10 rounded-lg p-6 h-fit"
              >
                <h2 className="text-2xl font-serif text-white mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white">
                    <span>Subtotal ({items.length} items)</span>
                    <span>Rs. {subtotal?.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-white">
                    <span>Shipping</span>
                    <span>Rs. {shipping?.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-300">
                      <span>Discount</span>
                      <span>-Rs. {discount?.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-white border-opacity-30 pt-3">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>Rs. {total?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-white text-[#8B6B6B] py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/products"
                  className="w-full mt-3 border border-white text-white py-3 px-6 rounded-lg font-medium hover:bg-white hover:text-[#8B6B6B] transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 