import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  // Define categories with their details
  const categories = [
    {
      name: 'Rings',
      slug: 'Rings',
      description: 'Dainty bands and heart-cut gems made to stack, gift, or treasure forever.',
      image: '/images/rings-cat.jpg'
    },
    {
      name: 'Necklaces',
      slug: 'Necklaces',
      description: 'Subtle sparkles that sit just right – delicate chains for every neckline.',
      image: '/images/necklace-cat.jpg'
    },
    {
      name: 'Earrings',
      slug: 'Earrings',
      description: 'From soft drops to tiny studs – elevate your everyday with a little glow.',
      image: '/images/earrings-cat.jpg'
    },
    {
      name: 'Bracelets',
      slug: 'Bracelets',
      description: 'Lightweight, layerable, and made for wrists that like a little shimmer.',
      image: '/images/bracelet-cat.jpg'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B98989, #533E3E)' }}>
      {/* Main Content */}
      <div className="pt-20">
        <div className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-serif text-white mb-4">Categories</h1>
              <p className="text-white text-lg max-w-2xl mx-auto">
                Explore our collection by category and find the perfect piece for any occasion.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <h2 className="text-4xl font-serif text-white mb-6">{category.name}</h2>
                  
                  {/* Category Image */}
                  <div className="mb-6">
                    <div className="w-80 h-96 mx-auto rounded-3xl overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Category Description */}
                  <p className="text-white text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Explore Button */}
                  <Link
                    to={`/products?category=${category.slug.toLowerCase()}`}
                    className="inline-block px-8 py-3 border-2 border-white text-white font-medium text-lg rounded-lg hover:bg-white hover:text-[#8B6B6B] transition-colors duration-300"
                  >
                    Explore
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#C3ACAC] py-4 mt-16">
        <div className="text-center">
          <p className="text-[#261A1A] text-lg font-medium">Free Shipping Over Rs. 3000</p>
        </div>
      </div>
    </div>
  );
};

export default Categories; 