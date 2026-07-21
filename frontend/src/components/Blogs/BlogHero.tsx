'use client';

import React from 'react';

export const BlogHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800 py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Our Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl">
            Explore our latest insights, tutorials, and industry updates to stay informed about technology trends.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
    </section>
  );
};

export default BlogHero;