'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaImage } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { api } from '@/services/api';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';

// Import rich text editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// Blog categories from our model
const BLOG_CATEGORIES = [
  'Technology', 
  'Web Development', 
  'Mobile Development', 
  'AI/ML', 
  'Cloud Computing', 
  'UI/UX', 
  'Digital Marketing', 
  'Cyber Security', 
  'Other'
];

type Blog = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  featuredImage: string;
  slug: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
};

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setFetchLoading(true);
        const response = await api.get(`/api/blogs/${params.id}`);
        
        if (response.data.success) {
          const blogData = response.data.data;
          setBlog(blogData);
          setTitle(blogData.title || '');
          setSummary(blogData.summary || '');
          setContent(blogData.content || '');
          setCategory(blogData.category || '');
          setTags(blogData.tags?.join(', ') || '');
          setStatus(blogData.status || 'draft');
          
          // Set image preview for existing image
          if (blogData.featuredImage && blogData.featuredImage !== 'default-blog.jpg') {
            setImagePreview(
              blogData.featuredImage.startsWith('http')
                ? blogData.featuredImage
                : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${blogData.featuredImage}`
            );
          }
        } else {
          setError('Failed to fetch blog details');
          toast.error('Failed to load blog details');
        }
      } catch (err: any) {
        console.error('Error fetching blog:', err);
        setError(err.message || 'Failed to fetch blog details');
        toast.error('Error loading blog data. Please try again.');
      } finally {
        setFetchLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !summary || !content || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (summary.length > 500) {
      toast.error('Summary should be less than 500 characters');
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('status', status);
      formData.append('tags', tags);
      
      if (featuredImage) {
        formData.append('featuredImage', featuredImage);
      }
      
      const response = await api.put(`/api/blogs/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        toast.success('Blog updated successfully!');
        router.push('/dashboard/my-blogs');
      } else {
        toast.error('Failed to update blog');
      }
    } catch (err: any) {
      console.error('Error updating blog:', err);
      toast.error(err.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error || 'Failed to load blog data'}</p>
          <Link 
            href="/dashboard/my-blogs"
            className="block mt-4 text-red-700 underline"
          >
            Return to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link 
            href="/dashboard/my-blogs" 
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <FaArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Edit Blog</h1>
        </div>
        {blog.status === 'published' && (
          <Link 
            href={`/blog/${blog.slug}`} 
            target="_blank"
            className="text-sm text-indigo-600 hover:text-indigo-700 underline"
          >
            View Published Blog
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Summary <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-1">
                  ({summary.length}/500)
                </span>
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of your blog"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={500}
                required
              />
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags <span className="text-xs text-gray-500">(comma separated)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tech, web, development"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  imagePreview ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="text-center">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={256}
                      height={128}
                      unoptimized
                      className="mx-auto h-32 w-auto rounded-md object-cover"
                      onError={(e) => {
                        applyBlogImageFallback(e.currentTarget);
                      }}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload an image</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Publication Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publication Status
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    name="status"
                    value="draft"
                    checked={status === 'draft'}
                    onChange={() => setStatus('draft')}
                  />
                  <span className="ml-2">Save as Draft</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600"
                    name="status"
                    value="published"
                    checked={status === 'published'}
                    onChange={() => setStatus('published')}
                  />
                  <span className="ml-2">Publish</span>
                </label>
              </div>
            </div>

            {/* Blog Stats (Read-only) */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm text-gray-500">Views</p>
                <p className="text-lg font-semibold">{blog.viewCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Rich Text Editor */}
          <div className="space-y-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="min-h-[300px]">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Write your blog content here..."
                  className="h-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-3">
          <Link
            href="/dashboard/my-blogs"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                Saving Changes...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 
