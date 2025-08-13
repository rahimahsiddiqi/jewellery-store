import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || ''
  });
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setFilters(prev => ({ ...prev, search: searchTerm }));
        }, 500); // 500ms delay
      };
    })(),
    []
  );

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInput(value);
    if (value.trim()) {
      setSearching(true);
    }
    debouncedSearch(value);
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (filters.category) params.append('category', filters.category);
        if (filters.search) params.append('search', filters.search);

        const response = await axios.get(`/api/products?${params}`);
        setProducts(response.data.products || response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
        setSearching(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Update page title and description
  useEffect(() => {
    const category = filters.category;
    if (category) {
      document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - Trinkets`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', 
        `Discover our beautiful ${category} collection at Trinkets. Handcrafted jewelry for every occasion.`
      );
    } else {
      document.title = 'Shop - Trinkets';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 
        'Explore our complete jewelry collection at Trinkets. Rings, necklaces, earrings, and bracelets for every style.'
      );
    }
  }, [filters.category]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: ''
    });
    setSearchInput('');
    setSearching(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-white text-xl">Loading products...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="text-white text-xl mb-4">{error}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-serif text-white mb-4">
              {filters.category ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1) : 'Shop'}
            </h1>
            <p className="text-white text-lg">
              {filters.category 
                ? `Discover our beautiful ${filters.category} collection`
                : 'Explore our complete jewelry collection'
              }
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white bg-opacity-10 rounded-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white ${searching ? 'animate-pulse' : ''}`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 rounded border border-white border-opacity-30 focus:outline-none focus:border-white"
                />
                {searching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white border-opacity-30 focus:outline-none focus:border-white appearance-none"
                >
                  <option value="">All Categories</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(filters.category || filters.search) && (
              <div className="mt-4 text-center">
                <button
                  onClick={clearFilters}
                  className="text-white hover:text-gray-200 underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-white text-xl mb-4">No products found</div>
              <p className="text-white opacity-80">Try adjusting your filters or search terms</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white bg-opacity-10 rounded-lg overflow-hidden hover:bg-opacity-20 transition-all duration-300"
                >
                  <Link to={`/products/${product._id}`}>
                    <div className="aspect-square bg-white bg-opacity-5 flex items-center justify-center p-4">
                      <img
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif text-white mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="text-white font-medium">
                        Rs. {product.price?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 