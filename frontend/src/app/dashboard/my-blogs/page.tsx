'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';

// Blog type definition
type Blog = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  status: 'draft' | 'published';
  category: string;
  viewCount: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
};

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'all' | 'published' | 'drafts'>('all');
  const router = useRouter();
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Fetch blogs when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/blogs/user/me');
        
        if (response.data.success) {
          setBlogs(response.data.data);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err: any) {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Failed to fetch blogs');
        toast.error('Failed to load your blogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on current tab
  const filteredBlogs = blogs.filter(blog => {
    if (currentTab === 'all') return true;
    if (currentTab === 'published') return blog.status === 'published';
    if (currentTab === 'drafts') return blog.status === 'draft';
    return true;
  });

  // Handle delete blog
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      setLoading(true);
      const response = await api.delete(`/api/blogs/${id}`);
      
      if (response.data.success) {
        // Remove the deleted blog from state
        setBlogs(blogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted successfully');
      } else {
        toast.error('Failed to delete the blog');
      }
    } catch (err: any) {
      console.error('Error deleting blog:', err);
      toast.error(err.message || 'Failed to delete the blog');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Blogs</h1>
          <p className="text-gray-600 mt-1">
            {isAdmin ? (
              <span className="flex items-center">
                Manage your blog posts 
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Admin
                </span>
              </span>
            ) : (
              "View blog posts"
            )}
          </p>
        </div>
        {isAdmin && (
          <Link 
            href="/dashboard/blogs/create"
            className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Create New Blog
          </Link>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {/* Tabs for filtering */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`py-2 px-4 font-medium ${currentTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setCurrentTab('all')}
        >
          All Posts ({blogs.length})
        </button>
        <button 
          className={`py-2 px-4 font-medium ${currentTab === 'published' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setCurrentTab('published')}
        >
          Published ({blogs.filter(b => b.status === 'published').length})
        </button>
        <button 
          className={`py-2 px-4 font-medium ${currentTab === 'drafts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setCurrentTab('drafts')}
        >
          Drafts ({blogs.filter(b => b.status === 'draft').length})
        </button>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No blogs found</h3>
          <p className="text-gray-500 mb-4">
            {isAdmin 
              ? "You haven't created any blogs yet."
              : "No blogs available to view."
            }
          </p>
          {isAdmin && (
            <Link 
              href="/dashboard/blogs/create"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Create your first blog
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 hidden sm:table-cell">Category</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 hidden lg:table-cell">Views</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Date</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3 bg-gray-200 rounded-md overflow-hidden hidden sm:block">
                        <img 
                          src={getImageUrl(blog.featuredImage)}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            applyBlogImageFallback(e.currentTarget);
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 truncate max-w-xs">{blog.title}</div>
                        <div className="text-sm text-gray-500 hidden sm:block">{blog.readTime} min read</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 hidden lg:table-cell">{blog.viewCount}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 hidden md:table-cell">{formatDate(blog.createdAt)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end items-center space-x-3">
                      <Link 
                        href={`/blogs/${blog.slug}`} 
                        target="_blank" 
                        className="text-gray-400 hover:text-gray-600" 
                        title="View"
                      >
                        <FaEye size={18} />
                      </Link>
                      <Link 
                        href={`/dashboard/blogs/edit/${blog._id}`} 
                        className="text-blue-400 hover:text-blue-600" 
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog._id)} 
                        className="text-red-400 hover:text-red-600" 
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 


