'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';
import type { Blog } from '@/types/blog';

const BLOGS_PER_PAGE = 6;
const ALL_CATEGORY = 'All';
type BlogListProps = {
  initialBlogs: Blog[];
};

const BlogList = ({ initialBlogs }: BlogListProps) => {
  const [allBlogs] = useState<Blog[]>(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);


  const categoriesList = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(
        allBlogs
          .map((blog) => blog.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    return [ALL_CATEGORY, ...dynamicCategories];
  }, [allBlogs]);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) {
      return allBlogs;
    }

    return allBlogs.filter((blog) => blog.category === selectedCategory);
  }, [allBlogs, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE));

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <section className='bg-white py-12 sm:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-3xl font-bold'>Our Blog Posts</h2>
            <p className='mt-2 text-gray-500'>
              {selectedCategory === ALL_CATEGORY
                ? `${filteredBlogs.length} published blog${filteredBlogs.length === 1 ? '' : 's'} available`
                : `${filteredBlogs.length} blog${filteredBlogs.length === 1 ? '' : 's'} in ${selectedCategory}`}
            </p>
          </div>
        </div>

        <div className='mb-8 overflow-x-auto pb-2'>
          <div className='flex min-w-max space-x-2'>
            {categoriesList.map((category) => {
              const count =
                category === ALL_CATEGORY
                  ? allBlogs.length
                  : allBlogs.filter((blog) => blog.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {paginatedBlogs.length === 0 ? (
          <div className='py-10 text-center'>
            <p className='text-gray-500'>No blogs found in this category.</p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
              {paginatedBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className='overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl'
                >
                  <Link href={`/blogs/${blog.slug}`}>
                    <div className='relative h-52 w-full bg-gray-100'>
                      <Image
                        src={getImageUrl(blog.featuredImage || '')}
                        alt={blog.title || 'Blog post'}
                        fill
                        sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                        className='object-cover'
                        onError={(e) => {
                          applyBlogImageFallback(e.currentTarget);
                        }}
                      />
                    </div>
                  </Link>

                  <div className='p-5 sm:p-6'>
                    <div className='mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-500'>
                      <span className='inline-flex items-center'>
                        <FaCalendarAlt className='mr-1' />
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'No date'}
                      </span>
                      <span className='inline-flex items-center'>
                        <FaClock className='mr-1' />
                        {blog.readTime || 5} min read
                      </span>
                    </div>

                    <Link href={`/blogs/${blog.slug}`}>
                      <h3 className='mb-3 line-clamp-2 text-xl font-semibold text-gray-900 transition-colors hover:text-indigo-600'>
                        {blog.title || 'Untitled'}
                      </h3>
                    </Link>

                    <p className='mb-4 line-clamp-3 text-gray-600'>
                      {blog.summary || 'No summary available'}
                    </p>

                    <div className='mb-5 flex flex-wrap gap-2'>
                      <span className='inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700'>
                        <FaTag className='mr-1' /> {blog.category || 'Uncategorized'}
                      </span>
                      {blog.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className='inline-flex items-center font-medium text-indigo-600 hover:underline'
                    >
                      Read More
                      <svg className='ml-1 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className='mt-12 flex justify-center'>
                <div className='flex space-x-1'>
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`rounded px-4 py-2 ${
                      currentPage === 1
                        ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`rounded px-4 py-2 ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`rounded px-4 py-2 ${
                      currentPage === totalPages
                        ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
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
