import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'center center' }}
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>
      
      {/* Fallback background if video doesn't load */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B98989] to-[#533E3E] z-0" style={{ display: 'none' }}></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
      {/* Main Layout Container */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-4 pt-32 pb-16">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 mt-32"
        >
          <h1 className="text-6xl font-serif text-white mb-6 leading-tight">
            Dainty. Detailed. Yours.
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of handcrafted jewelry pieces that tell your unique story. 
            Each piece is designed with love and crafted with precision.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-white text-[#8B6B6B] font-medium text-lg rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>


      </div>

      {/* Footer */}
      <div className="relative z-20 bg-[#C3ACAC] py-4 mt-16">
        <div className="text-center">
          <p className="text-[#261A1A] text-lg font-medium">Free Shipping Over Rs. 3000</p>
        </div>
      </div>
    </div>
  );
};

export default Home;