'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiTag,
  FiUser,
  FiBarChart2,
  FiShare2,
  FiLoader,
  FiAlertCircle,
} from 'react-icons/fi';
import { api } from '@/services/api';

interface Stat {
  label: string;
  value: string;
}

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image: string;
  client: string;
  duration: string;
  year: string;
  stats: Stat[];
  tags: string[];
  featured: boolean;
  status: string;
  testimonial?: Testimonial;
  gallery?: string[];
}

export default function CaseStudyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Use the correct API endpoint for slug
        const response = await api.get(`/api/case-studies/slug/${params.slug}`);

        if (response.data && response.data.success && response.data.data) {
          setCaseStudy(response.data.data);
          if (
            response.data.data.gallery &&
            response.data.data.gallery.length > 0
          ) {
            setActiveImage(response.data.data.gallery[0]);
          }
        } else {
          setError('Failed to fetch case study');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch case study');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [params.slug, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: caseStudy?.title || 'Case Study',
          text: caseStudy?.description || '',
          url: window.location.href,
        })
        .catch(() => {
          // Silently handle share errors
        });
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          <FiLoader className='w-12 h-12 text-indigo-600 animate-spin mb-4' />
          <p className='text-lg text-gray-600'>Loading case study...</p>
          {retryCount > 0 && (
            <p className='text-sm text-gray-500 mt-2'>
              Retry attempt {retryCount}/3
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-white rounded-lg shadow-md p-8 max-w-2xl w-full'>
          <div className='flex items-start text-red-600 mb-4'>
            <FiAlertCircle className='w-6 h-6 mr-3 flex-shrink-0' />
            <div>
              <h2 className='text-xl font-bold text-gray-900 mb-2'>
                Case Study Not Found
              </h2>
              <p className='text-gray-600 mb-4'>
                {error ||
                  'The case study you are looking for does not exist or has been removed.'}
              </p>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/case-studies'
              className='inline-flex items-center justify-center text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded-md px-4 py-2'
            >
              <FiArrowLeft className='mr-2' /> Back to Case Studies
            </Link>

            {retryCount < 3 && (
              <button
                onClick={handleRetry}
                className='inline-flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-4 py-2'
              >
                <FiLoader className='mr-2' /> Retry Loading
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 pt-16 pb-20'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-indigo-900 to-blue-900 text-white'>
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-4xl mx-auto'>
            <Link
              href='/case-studies'
              className='inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors'
            >
              <FiArrowLeft className='mr-2' /> Back to Case Studies
            </Link>

            <motion.h1
              className='text-4xl md:text-5xl font-bold mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {caseStudy.title}
            </motion.h1>

            <motion.p
              className='text-xl text-indigo-100 mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {caseStudy.description}
            </motion.p>

            <motion.div
              className='flex flex-wrap items-center gap-6 text-sm'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className='flex items-center'>
                <FiUser className='mr-2' />
                <span>
                  Client: <strong>{caseStudy.client}</strong>
                </span>
              </div>

              <div className='flex items-center'>
                <FiClock className='mr-2' />
                <span>
                  Duration: <strong>{caseStudy.duration}</strong>
                </span>
              </div>

              <div className='flex items-center'>
                <FiCalendar className='mr-2' />
                <span>
                  Year: <strong>{caseStudy.year}</strong>
                </span>
              </div>

              <div className='flex items-center'>
                <FiTag className='mr-2' />
                <span>
                  Category: <strong>{caseStudy.category}</strong>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Featured Image */}
            <motion.div
              className='rounded-xl overflow-hidden shadow-lg mb-10 relative aspect-video'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={
                  activeImage ||
                  caseStudy.image ||
                  'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
                }
                alt={caseStudy.title}
                fill
                className='object-cover'
              />
            </motion.div>

            {/* Gallery */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <motion.div
                className='grid grid-cols-3 gap-4 mb-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {caseStudy.gallery.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImage === image
                        ? 'border-indigo-600 shadow-md'
                        : 'border-transparent hover:border-indigo-300'
                    }`}
                    onClick={() => setActiveImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${caseStudy.title} - Gallery image ${index + 1}`}
                      fill
                      className='object-cover'
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              className='prose prose-lg max-w-none'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: caseStudy.content }}
            />

            {/* Tags */}
            <motion.div
              className='mt-10'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className='text-lg font-semibold mb-3'>Technologies Used</h3>
              <div className='flex flex-wrap gap-2'>
                {caseStudy.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Stats */}
            <motion.div
              className='bg-white rounded-xl shadow-md p-6 mb-8'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className='text-lg font-semibold mb-4 flex items-center'>
                <FiBarChart2 className='mr-2 text-indigo-600' />
                Key Results
              </h3>

              <div className='space-y-4'>
                {caseStudy.stats.map((stat, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center'
                  >
                    <span className='text-gray-600'>{stat.label}</span>
                    <span className='font-bold text-indigo-600'>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <motion.div
                className='bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 mb-8'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className='relative'>
                  <svg
                    className='absolute -top-4 -left-4 h-10 w-10 text-indigo-300 opacity-50'
                    fill='currentColor'
                    viewBox='0 0 32 32'
                  >
                    <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
                  </svg>

                  <blockquote className='relative'>
                    <p className='text-lg italic text-gray-700 mb-4'>
                      {caseStudy.testimonial.quote}
                    </p>
                    <footer className='text-sm'>
                      <strong className='text-gray-900 font-medium block'>
                        {caseStudy.testimonial.author}
                      </strong>
                      <span className='text-gray-600'>
                        {caseStudy.testimonial.position}
                      </span>
                    </footer>
                  </blockquote>
                </div>
              </motion.div>
            )}

            {/* Share */}
            <motion.div
              className='bg-white rounded-xl shadow-md p-6'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className='text-lg font-semibold mb-4 flex items-center'>
                <FiShare2 className='mr-2 text-indigo-600' />
                Share This Case Study
              </h3>

              <button
                onClick={handleShare}
                className='w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors flex items-center justify-center'
              >
                <FiShare2 className='mr-2' />
                Share
              </button>
            </motion.div>

            {/* CTA */}
            <motion.div
              className='mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-md p-6 text-white'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className='text-xl font-bold mb-3'>
                Ready to start your project?
              </h3>
              <p className='mb-4 text-indigo-100'>
                Let's discuss how we can help you achieve similar results.
              </p>
              <Link
                href='/contact'
                className='block w-full py-2 px-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-center font-medium'
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Case Studies */}
      <div className='bg-gray-100 py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            More Case Studies
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* This would be populated with actual related case studies */}
            {/* For now, we'll just show a CTA */}
            <div className='col-span-full flex justify-center'>
              <Link
                href='/case-studies'
                className='inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors'
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
