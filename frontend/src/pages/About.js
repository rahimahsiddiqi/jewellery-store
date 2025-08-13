import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
              <h1 className="text-5xl font-serif text-white mb-4">About Us</h1>
              <p className="text-white text-lg max-w-2xl mx-auto">
                Discover the story behind Trinkets and our passion for creating timeless jewelry pieces.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
            >
              {/* Story Text */}
                             <div className="text-white">
                 <h2 className="text-3xl font-serif mb-6">Our Story</h2>
                 <p className="text-lg leading-relaxed mb-6">
                   At Trinkets, we believe every piece tells a story — a quiet whisper of a memory, a bold declaration of love, or a subtle reminder of who you are. Inspired by moments of affection, and the beauty of self-expression, our jewelry is crafted to transform the ordinary into something magical.
                 </p>
                 <p className="text-lg leading-relaxed mb-6">
                   Our pieces are handcrafted with patience, precision, and a deep respect for tradition, yet embrace the modern sensibilities of minimalism and timeless style. We work only with the finest ethically sourced materials, from radiant gold to luminous pearls and conflict-free gemstones.
                 </p>
                 <p className="text-lg leading-relaxed mb-6">
                   For us, jewelry is more than adornment — it's a personal talisman, a keeper of memories, and a way to carry a piece of your story wherever you go. Trinkets is here to be part of your journey.
                 </p>
                
               </div>

              {/* Image */}
              <div className="flex justify-center">
                <div className="w-96 h-[500px] bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <img
                    src="/images/our-story.png"
                    alt="Our Story"
                    className="w-80 h-[450px] object-cover rounded-lg"
                  />
                </div>
              </div>
            </motion.div>




          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-[#C3ACAC] py-4 mt-16"
      >
        <div className="text-center">
          <p className="text-[#261A1A] text-lg font-medium">
            Free Shipping Over Rs. 3000
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 