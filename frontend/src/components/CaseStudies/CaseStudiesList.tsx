'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Stat {
  label: string;
  value: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  client: string;
  duration: string;
  year: string;
  stats: Stat[];
  tags: string[];
  featured: boolean;
  status: string;
}

// Fallback case studies in case API fails
const fallbackCaseStudies = [
  {
    _id: '1',
    title: 'E-commerce Platform Redesign',
    slug: 'ecommerce-platform',
    category: 'Web Development',
    description:
      'Complete redesign and development of a modern e-commerce platform resulting in 150% increase in sales.',
    image: '/case-studies/case-studies-1.jpg',
    stats: [
      { label: 'Increase in Sales', value: '150%' },
      { label: 'User Engagement', value: '+200%' },
      { label: 'Load Time', value: '-60%' },
    ],
    tags: ['React', 'Node.js', 'AWS'],
    client: 'Fashion Retail Co.',
    duration: '3 months',
    year: '2023',
    featured: true,
    status: 'published',
  },
  {
    _id: '2',
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    category: 'Mobile Apps',
    description:
      'Developed a secure and user-friendly mobile banking application with advanced features and biometric authentication.',
    image: '/case-studies/case-studies-2.jpg',
    stats: [
      { label: 'User Adoption', value: '85%' },
      { label: 'App Rating', value: '4.8/5' },
      { label: 'Transactions', value: '1M+' },
    ],
    tags: ['React Native', 'Firebase', 'Node.js'],
    client: 'Digital Bank Ltd.',
    duration: '6 months',
    year: '2023',
    featured: false,
    status: 'published',
  },
];

export const CaseStudiesList = () => {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All';

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch case studies
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Make sure we're using the public endpoint, not the protected one
        const response = await api.get('/api/case-studies');

        if (response.data && response.data.success && response.data.data) {
          // Handle nested data structure
          if (Array.isArray(response.data.data.data)) {
            const caseStudiesData = response.data.data.data || [];
            setCaseStudies(caseStudiesData);
          }
          // Handle flat data structure
          else if (Array.isArray(response.data.data)) {
            const caseStudiesData = response.data.data || [];
            setCaseStudies(caseStudiesData);
          } else {
            setCaseStudies(fallbackCaseStudies);
            setError('Received unexpected data format. Using fallback data.');
          }
        } else {
          setCaseStudies(fallbackCaseStudies);
          setError('Received unexpected data format. Using fallback data.');
        }
      } catch (error: any) {
        setError('Failed to load case studies. Using fallback data.');
        setCaseStudies(fallbackCaseStudies);
        toast.error('Failed to load case studies. Using sample data instead.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Filter case studies when category changes
  useEffect(() => {
    if (categoryFilter === 'All') {
      setFilteredCaseStudies(caseStudies);
    } else {
      setFilteredCaseStudies(
        caseStudies.filter((study) => study.category === categoryFilter)
      );
    }
  }, [categoryFilter, caseStudies]);

  if (isLoading) {
    return (
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
        <div className='container mx-auto px-4 flex flex-col items-center justify-center'>
          <FiLoader className='w-10 h-10 animate-spin text-indigo-600 mb-4' />
          <p className='text-lg text-gray-600'>Loading case studies...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        {error && (
          <div className='mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 flex items-start'>
            <FiAlertCircle className='mr-2 mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium'>Note</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredCaseStudies.map((study, index) => (
            <motion.div
              key={study._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(study._id)}
              onMouseLeave={() => setHoveredId(null)}
              className='group'
            >
              <Link href={`/case-studies/${study.slug}`}>
                <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300'>
                  {/* Image Container */}
                  <div className='relative h-48 overflow-hidden'>
                    <Image
                      src={
                        study.image ||
                        'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
                      }
                      alt={study.title}
                      fill
                      className='object-cover transform group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

                    {/* Category Badge */}
                    <div className='absolute top-4 left-4'>
                      <span className='px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900'>
                        {study.category}
                      </span>
                    </div>

                    {/* Client & Duration */}
                    <div className='absolute bottom-4 left-4 right-4 flex justify-between items-center text-white'>
                      <span className='text-sm font-medium'>
                        {study.client}
                      </span>
                      <span className='text-sm'>{study.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors'>
                      {study.title}
                    </h3>
                    <p className='text-gray-600 mb-4 line-clamp-2'>
                      {study.description}
                    </p>

                    {/* Stats */}
                    <div className='grid grid-cols-3 gap-2 mb-4'>
                      {study.stats &&
                        study.stats.slice(0, 3).map((stat, i) => (
                          <div key={i} className='text-center'>
                            <p className='text-indigo-600 font-bold text-lg'>
                              {stat.value}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {stat.label}
                            </p>
                          </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {study.tags &&
                        study.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className='px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600'
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCaseStudies.length === 0 && !isLoading && (
          <div className='text-center py-10'>
            <p className='text-gray-500 text-lg'>
              {categoryFilter === 'All'
                ? 'No case studies found'
                : `No case studies found in the "${categoryFilter}" category`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
