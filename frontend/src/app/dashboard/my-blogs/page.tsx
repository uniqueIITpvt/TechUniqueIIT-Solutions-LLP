'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiFilter,
  FiSearch,
} from 'react-icons/fi';
import { MdPublish, MdDrafts } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  status: 'draft' | 'published';
  createdAt: string;
  views: number;
  likes: number;
  thumbnail?: string;
  category?: string;
}

export default function MyBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'published' | 'draft'
  >('all');
  const [isDeleteLoading, setIsDeleteLoading] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await api.get('/api/blogs/my-blogs');

        if (response.data && response.data.success) {
          const blogsData = response.data.data || [];
          setBlogs(blogsData);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (error: any) {
        setError('Failed to fetch blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...blogs];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((blog) => blog.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.excerpt.toLowerCase().includes(term) ||
          (blog.category && blog.category.toLowerCase().includes(term))
      );
    }

    setFilteredBlogs(result);
  }, [blogs, statusFilter, searchTerm]);

  const handleDeleteConfirm = (blogId: string) => {
    setShowConfirmDelete(blogId);
  };

  const handleDeleteCancel = () => {
    setShowConfirmDelete(null);
  };

  const handleDelete = async (blogId: string) => {
    try {
      setIsDeleteLoading(blogId);
      const response = await api.delete(`/api/blogs/${blogId}`);

      if (response.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
        toast.success('Blog deleted successfully');
      } else {
        throw new Error(response.data.message || 'Failed to delete blog');
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete blog'
      );
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    } finally {
      setIsDeleteLoading(null);
      setShowConfirmDelete(null);
    }
  };

  const getPlaceholderImage = (title: string) => {
    // Generate a placeholder image with the first letter of the title
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500',
    ];
    const colorIndex = title.length % colors.length;
    return { color: colors[colorIndex], letter: title.charAt(0).toUpperCase() };
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
            My Blog Posts
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/post-blog')}
            className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm'
          >
            <FiPlus size={18} />
            <span>Create New Post</span>
          </motion.button>
        </div>

        {/* Filters and Search */}
        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiSearch className='text-gray-400' />
              </div>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by title or content...'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div className='flex items-center gap-2'>
              <FiFilter className='text-gray-500' />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              >
                <option value='all'>All Posts</option>
                <option value='published'>Published</option>
                <option value='draft'>Drafts</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6'
        >
          {error}
        </motion.div>
      )}

      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center'
        >
          <div className='max-w-md mx-auto'>
            <div className='bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
              <MdDrafts className='text-indigo-500 text-3xl' />
            </div>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              No Blog Posts Yet
            </h2>
            <p className='text-gray-600 mb-6'>
              Start creating your first blog post to share your knowledge and
              insights with the world.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard/post-blog')}
              className='bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2'
            >
              <FiPlus size={18} />
              <span>Create Your First Post</span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'
          >
            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
              <div className='flex items-center'>
                <div className='p-3 bg-blue-100 rounded-lg'>
                  <FiEye className='text-blue-600 text-xl' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>
                    Total Posts
                  </p>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {blogs.length}
                  </h3>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
              <div className='flex items-center'>
                <div className='p-3 bg-green-100 rounded-lg'>
                  <MdPublish className='text-green-600 text-xl' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>Published</p>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {blogs.filter((blog) => blog.status === 'published').length}
                  </h3>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
              <div className='flex items-center'>
                <div className='p-3 bg-yellow-100 rounded-lg'>
                  <MdDrafts className='text-yellow-600 text-xl' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>Drafts</p>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {blogs.filter((blog) => blog.status === 'draft').length}
                  </h3>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
              <div className='flex items-center'>
                <div className='p-3 bg-purple-100 rounded-lg'>
                  <FiEye className='text-purple-600 text-xl' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-500'>
                    Total Views
                  </p>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {blogs.reduce((sum, blog) => sum + blog.views, 0)}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredBlogs.length === 0 ? (
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center'>
              <p className='text-gray-600'>
                No posts match your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className='mt-4 text-indigo-600 hover:text-indigo-700'
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'
                  >
                    {/* Blog Thumbnail */}
                    <div className='relative h-48 bg-gray-100'>
                      {blog.thumbnail ? (
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className='object-cover'
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center ${
                            getPlaceholderImage(blog.title).color
                          }`}
                        >
                          <span className='text-white text-5xl font-bold'>
                            {getPlaceholderImage(blog.title).letter}
                          </span>
                        </div>
                      )}
                      <div className='absolute top-3 right-3'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {blog.status === 'published' ? (
                            <MdPublish className='mr-1' />
                          ) : (
                            <MdDrafts className='mr-1' />
                          )}
                          {blog.status.charAt(0).toUpperCase() +
                            blog.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className='p-5'>
                      <h2 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-2'>
                        {blog.title}
                      </h2>
                      <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                        {blog.excerpt}
                      </p>

                      {/* Blog Stats */}
                      <div className='flex items-center justify-between text-xs text-gray-500 mb-4'>
                        <span className='flex items-center'>
                          <FiEye className='mr-1' /> {blog.views} views
                        </span>
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
                        <button
                          onClick={() => router.push(`/blog/${blog._id}`)}
                          className='text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm'
                        >
                          <FiEye size={16} />
                          <span>View</span>
                        </button>

                        <div className='flex space-x-3'>
                          <button
                            onClick={() =>
                              router.push(`/dashboard/edit-blog/${blog._id}`)
                            }
                            className='text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm'
                          >
                            <FiEdit size={16} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteConfirm(blog._id)}
                            className='text-red-600 hover:text-red-800 flex items-center gap-1 text-sm'
                            disabled={isDeleteLoading === blog._id}
                          >
                            {isDeleteLoading === blog._id ? (
                              <div className='animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full'></div>
                            ) : (
                              <FiTrash2 size={16} />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {showConfirmDelete === blog._id && (
                      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className='bg-white rounded-lg p-6 max-w-md w-full'
                        >
                          <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                            Confirm Delete
                          </h3>
                          <p className='text-gray-600 mb-6'>
                            Are you sure you want to delete "{blog.title}"? This
                            action cannot be undone.
                          </p>
                          <div className='flex justify-end gap-3'>
                            <button
                              onClick={handleDeleteCancel}
                              className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
                              disabled={isDeleteLoading === blog._id}
                            >
                              {isDeleteLoading === blog._id ? (
                                <span className='flex items-center justify-center'>
                                  <div className='animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2'></div>
                                  Deleting...
                                </span>
                              ) : (
                                'Delete'
                              )}
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
}
