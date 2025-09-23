'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';
import { blogApi } from '@/services/api';
import LoadingSpinner from '../LoadingSpinner';
import { getImageUrl } from '@/utils/imageHelper';
import { getPaginatedBlogs, FallbackBlog } from '@/data/fallbackBlogs';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  author: any;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);
  
  const categoriesList = [
    'All',
    'Technology',
    'Web Development',
    'Mobile Development',
    'AI/ML',
    'Cloud Computing',
    'UI/UX',
    'Digital Marketing',
    'Cyber Security',
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError('');
        setUsingFallback(false);
        
        const params: any = { 
          page: currentPage,
          limit: 6
        };
        
        if (selectedCategory && selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        
        const response = await blogApi.getBlogs(params);
        
        // Handle different possible response formats
        if (response.success && Array.isArray(response.data)) {
          setBlogs(response.data);
          if (response.pagination) {
            setTotalPages(response.pagination.totalPages || 1);
          } else {
            setTotalPages(Math.ceil(response.count / 6) || 1);
          }
        } else if (Array.isArray(response)) {
          setBlogs(response);
          setTotalPages(1);
        } else if (response && Array.isArray(response.blogs)) {
          setBlogs(response.blogs);
          const totalItems = response.totalCount || response.blogs.length;
          setTotalPages(Math.ceil(totalItems / 6) || 1);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching blogs from API, using fallback data:', err);
        
        // Use fallback data when API fails
        const fallbackData = getPaginatedBlogs(
          currentPage, 
          6, 
          selectedCategory && selectedCategory !== 'All' ? selectedCategory : undefined
        );
        
        setBlogs(fallbackData.blogs as Blog[]);
        setTotalPages(fallbackData.totalPages);
        setUsingFallback(true);
        setError('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? '' : category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="py-10 text-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Our Blog Posts</h2>
          {/* {usingFallback && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Demo Content
            </div>
          )} */}
        </div>
        
        {/* Categories Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  (category === 'All' && !selectedCategory) || selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {blogs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No blogs found in this category.</p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link href={`/blogs/${blog.slug}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={getImageUrl(blog.featuredImage)}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="inline-flex items-center mr-3">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="inline-flex items-center">
                        <FaClock className="mr-1" />
                        {blog.readTime} min read
                      </span>
                    </div>
                    
                    <Link href={`/blogs/${blog.slug}`}>
                      <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <FaTag className="mr-1" /> {blog.category}
                      </span>
                      {blog.tags && blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blogs/${blog.slug}`}
                      className="text-blue-600 font-medium hover:underline inline-flex items-center"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded ${
                        currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogList;
