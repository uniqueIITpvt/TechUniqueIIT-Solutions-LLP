'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHash, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';

// Static categories data matching your list
const staticCategories = [
  { _id: 'technology', name: 'Technology', count: 0 },
  { _id: 'programming', name: 'Programming', count: 0 },
  { _id: 'web-development', name: 'Web Development', count: 0 },
  { _id: 'mobile-development', name: 'Mobile Development', count: 0 },
  { _id: 'ai-ml', name: 'AI & ML', count: 0 },
  { _id: 'cybersecurity', name: 'Cybersecurity', count: 0 },
  { _id: 'cloud-computing', name: 'Cloud Computing', count: 0 },
  { _id: 'devops', name: 'DevOps', count: 0 },
  { _id: 'other', name: 'Other', count: 0 },
];

interface Category {
  _id: string;
  name: string;
  count: number;
}

interface BlogCategoriesProps {
  onCategoryChange: (categoryId: string) => void;
  selectedCategory: string;
  blogs?: any[]; // To calculate category counts
}

export function BlogCategories({
  onCategoryChange,
  selectedCategory,
  blogs = [],
}: BlogCategoriesProps) {
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate counts for each category
  const categoriesWithCounts = staticCategories.map((category) => ({
    ...category,
    count: blogs.filter(
      (blog) => blog.category.toLowerCase() === category.name.toLowerCase()
    ).length,
  }));

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Define category colors
  const categoryColors = {
    Technology:
      'bg-blue-500/10 border-blue-500/30 text-blue-600 hover:bg-blue-500/20',
    Programming:
      'bg-green-500/10 border-green-500/30 text-green-600 hover:bg-green-500/20',
    'Web Development':
      'bg-purple-500/10 border-purple-500/30 text-purple-600 hover:bg-purple-500/20',
    'Mobile Development':
      'bg-orange-500/10 border-orange-500/30 text-orange-600 hover:bg-orange-500/20',
    'AI & ML':
      'bg-red-500/10 border-red-500/30 text-red-600 hover:bg-red-500/20',
    Cybersecurity:
      'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/20',
    'Cloud Computing':
      'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 hover:bg-yellow-500/20',
    DevOps:
      'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 hover:bg-cyan-500/20',
    Other:
      'bg-gray-500/10 border-gray-300/30 text-gray-600 hover:bg-gray-500/20',
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsModalOpen(false);
  };

  const displayedCategories = showAll
    ? categoriesWithCounts
    : categoriesWithCounts.slice(0, 8);
  const selectedCategoryName =
    selectedCategory === 'all'
      ? 'All Categories'
      : categoriesWithCounts.find((cat) => cat._id === selectedCategory)
          ?.name || 'All Categories';

  return (
    <section className='py-8 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <FiHash className='text-indigo-600 w-5 h-5' />
            <h2 className='text-xl font-bold text-gray-900'>Categories</h2>
          </div>
          <div className='hidden md:block'>
            {categoriesWithCounts.length > 8 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className='flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors'
              >
                <FiFilter className='w-4 h-4' />
                {showAll ? 'Show Less' : 'Show All'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Category Button */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between'
          >
            <span className='flex items-center gap-2'>
              <span className='text-gray-700'>
                {selectedCategory === 'all'
                  ? 'All Categories'
                  : categoriesWithCounts.find(
                      (cat) => cat._id === selectedCategory
                    )?.name}
              </span>
              {selectedCategory !== 'all' && (
                <span className='px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full'>
                  {categoriesWithCounts.find(
                    (cat) => cat._id === selectedCategory
                  )?.count || 0}
                </span>
              )}
            </span>
            <FiFilter className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        {/* Desktop Categories */}
        <div className='hidden md:flex flex-wrap gap-3'>
          <motion.button
            key='all'
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white border-transparent'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Categories
          </motion.button>

          {displayedCategories.map((category) => (
            <motion.button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === category._id
                  ? 'bg-indigo-600 text-white border-transparent'
                  : categoryColors[
                      category.name as keyof typeof categoryColors
                    ] ||
                    'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='flex items-center gap-2'>
                {category.name}
                <span className='px-2 py-0.5 text-xs rounded-full bg-white/20'>
                  {category.count}
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Mobile Category Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-black/50 z-40 md:hidden'
                onClick={() => setIsModalOpen(false)}
              />

              {/* Modal */}
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className='fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 md:hidden max-h-[80vh] overflow-y-auto'
              >
                <div className='sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Select Category
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <FiX className='w-5 h-5 text-gray-500' />
                  </button>
                </div>

                <div className='p-4 space-y-2'>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`w-full px-4 py-3 rounded-xl text-left transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    All Categories
                  </button>

                  {categoriesWithCounts.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryClick(category._id)}
                      className={`w-full px-4 py-3 rounded-xl text-left transition-colors flex items-center justify-between ${
                        selectedCategory === category._id
                          ? 'bg-indigo-600 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          selectedCategory === category._id
                            ? 'bg-white/20'
                            : 'bg-indigo-100 text-indigo-600'
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className='sticky bottom-0 bg-white border-t border-gray-100 p-4'>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors'
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
