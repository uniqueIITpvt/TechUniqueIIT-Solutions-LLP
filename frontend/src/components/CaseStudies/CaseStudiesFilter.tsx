'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { api } from '@/services/api';

// Default categories if API fails
const defaultCategories = [
  'All',
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Cloud Solutions',
];

interface CaseStudy {
  category: string;
  [key: string]: any;
}

export const CaseStudiesFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState(defaultCategories);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [isLoading, setIsLoading] = useState(false);

  // Fetch unique categories from case studies
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/case-studies/public');

        if (response.data && response.data.success && response.data.data) {
          // Extract unique categories with proper typing
          let caseStudies: CaseStudy[] = [];

          // Handle nested data structure
          if (Array.isArray(response.data.data.data)) {
            caseStudies = response.data.data.data;
          }
          // Handle flat data structure
          else if (Array.isArray(response.data.data)) {
            caseStudies = response.data.data;
          }

          const uniqueCategories = [
            'All',
            ...new Set(
              caseStudies.map((study) => study.category).filter(Boolean)
            ),
          ];

          if (uniqueCategories.length > 1) {
            setCategories(uniqueCategories);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Keep default categories on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    // Create new URLSearchParams with current params
    const params = new URLSearchParams();

    // Copy existing params
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    // Update or remove category parameter
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className='py-8 bg-white border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap gap-4 justify-center'>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={isLoading}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
