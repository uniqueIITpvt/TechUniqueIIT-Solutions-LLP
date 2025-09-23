'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen, FiUsers, FiTrendingUp } from 'react-icons/fi';

export const BlogHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our latest insights, tutorials, and industry updates to stay informed about technology trends.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
    </div>
  );
};

export default BlogHero;
