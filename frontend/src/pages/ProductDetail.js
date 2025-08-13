import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-white text-xl">Loading product...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="text-white text-xl mb-4">{error || 'Product not found'}</div>
              <Link 
                to="/products" 
                className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity);
    
    if (result.success) {
      console.log('Added to cart:', { product, quantity });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
      {/* Header spacing */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link 
              to="/products" 
              className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Products
            </Link>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="bg-white bg-opacity-10 rounded-lg p-8 flex items-center justify-center">
                <img
                  src={product.images?.[0] || '/images/placeholder.jpg'}
                  alt={product.name}
                  className="w-full max-w-md object-contain"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Product Title */}
              <div>
                <h1 className="text-4xl font-serif text-white mb-4">{product.name}</h1>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-serif text-white">Rs. {product.price?.toLocaleString() || '0'}</span>
              </div>

              {/* Product Details */}
              <div className="bg-white bg-opacity-10 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div>
                    <span className="font-medium">Category:</span>
                    <p>{product.category?.name || product.category}</p>
                  </div>
                  <div>
                    <span className="font-medium">Material:</span>
                    <p>{product.material || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Stone:</span>
                    <p>{product.gemstone || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Weight:</span>
                    <p>{product.weight ? `${product.weight} ${product.weightUnit || 'g'}` : 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-serif text-white mb-3">Description</h3>
                <p className="text-white leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-white font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white text-xl font-medium w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-white text-[#8B6B6B] py-4 px-8 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 