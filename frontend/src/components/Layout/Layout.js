import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isCategoriesPage = location.pathname === '/categories';
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchClick = () => {
    navigate('/products');
    // Add a small delay to ensure the page loads before focusing
    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder="Search products..."]');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#C3ACAC] shadow-sm absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="text-2xl font-serif transition-colors text-[#261A1A] hover:text-[#261A1A]">
                Trinkets.
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 mx-16">
              <div className="flex items-center space-x-12">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Link to="/categories" className="transition-colors font-medium text-base text-[#261A1A] hover:text-[#261A1A]">
                    Categories
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Link to="/products" className="transition-colors font-medium text-base text-[#261A1A] hover:text-[#261A1A]">
                    Shop
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link to="/about" className="transition-colors font-medium text-base text-[#261A1A] hover:text-[#261A1A]">
                    About
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link to="/contact" className="transition-colors font-medium text-base text-[#261A1A] hover:text-[#261A1A]">
                    Contact
                  </Link>
                </motion.div>
              </div>
            </nav>

            {/* Right Side Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center space-x-4"
            >
              {/* Search Icon */}
              <button
                onClick={handleSearchClick}
                className="text-[#261A1A] hover:text-[#261A1A] transition-colors"
              >
                <FiSearch size={20} />
              </button>

              {/* Cart Icon */}
              <Link to="/cart" className="relative text-[#261A1A] hover:text-[#261A1A] transition-colors">
                <FiShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-[#261A1A] hover:text-[#261A1A] transition-colors"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-4 pb-4 border-t border-[#261A1A] border-opacity-20"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  to="/categories"
                  className="transition-colors font-medium text-[#261A1A] hover:text-[#261A1A]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  to="/products"
                  className="transition-colors font-medium text-[#261A1A] hover:text-[#261A1A]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="transition-colors font-medium text-[#261A1A] hover:text-[#261A1A]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="transition-colors font-medium text-[#261A1A] hover:text-[#261A1A]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSearchClick();
                  }}
                  className="flex items-center space-x-2 transition-colors font-medium text-[#261A1A] hover:text-[#261A1A]"
                >
                  <FiSearch size={16} />
                  <span>Search</span>
                </button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout; 