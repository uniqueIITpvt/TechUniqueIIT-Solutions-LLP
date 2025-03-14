'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FiImage } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Select from 'react-select';
import type { ReactQuillProps } from 'react-quill';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

// Add this interface at the top with other interfaces
interface QuillContent {
  value: string;
  onChange: (value: string) => void;
  theme?: string;
  className?: string;
}

// Update the ReactQuill dynamic import
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // Remove the forwardedRef from props
    return function QuillWrapper(props: ReactQuillProps) {
      return <RQ {...props} />;
    };
  },
  { ssr: false }
);

interface BlogData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  thumbnail: File | null;
  thumbnailUrl?: string;
}

const categories = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Programming', label: 'Programming' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'AI & ML', label: 'AI & ML' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Business', label: 'Business' },
  { value: 'Other', label: 'Other' },
];

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [blogData, setBlogData] = useState<BlogData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    thumbnail: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/blogs/${params.slug}`);
      const blog = response.data.data;

      setBlogData({
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        category: blog.category || '',
        tags: blog.tags || [],
        status: blog.status || 'draft',
        thumbnail: null,
        thumbnailUrl: blog.thumbnailUrl,
      });

      setEditorContent(blog.content || '');
      if (blog.thumbnailUrl) {
        setThumbnailPreview(blog.thumbnailUrl);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog data');
    } finally {
      setIsLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('excerpt', blogData.excerpt);
      formData.append('content', blogData.content);
      formData.append('category', blogData.category);
      blogData.tags.forEach((tag) => formData.append('tags[]', tag));
      formData.append('status', blogData.status);

      if (blogData.thumbnail) {
        formData.append('thumbnail', blogData.thumbnail);
      }

      const response = await api.put(`/api/blogs/${params.slug}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Blog updated successfully!');
      setTimeout(() => {
        router.push('/dashboard/my-blogs');
      }, 2000);
    } catch (error: any) {
      console.error('Error updating blog:', error);
      setError(
        error.response?.data?.message ||
          'Failed to update blog. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white rounded-lg shadow-md p-6'
      >
        <h1 className='text-2xl font-bold mb-6'>Edit Blog Post</h1>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        {success && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Title */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Title <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='title'
              value={blogData.title}
              onChange={(e) =>
                setBlogData({ ...blogData, title: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor='excerpt'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Excerpt <span className='text-red-500'>*</span>
            </label>
            <textarea
              id='excerpt'
              value={blogData.excerpt}
              onChange={(e) =>
                setBlogData({ ...blogData, excerpt: e.target.value })
              }
              rows={3}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              required
            ></textarea>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor='content'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Content <span className='text-red-500'>*</span>
            </label>
            <ReactQuill
              value={blogData.content}
              onChange={(value) => setBlogData({ ...blogData, content: value })}
              theme='snow'
              className='h-64 mb-12'
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Category <span className='text-red-500'>*</span>
            </label>
            <Select
              options={categories}
              value={categories.find((c) => c.value === blogData.category)}
              onChange={(option) =>
                setBlogData({ ...blogData, category: option?.value || '' })
              }
              className='basic-single'
              classNamePrefix='select'
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor='tags'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Tags
            </label>
            <Select
              isMulti
              options={[
                { value: 'React', label: 'React' },
                { value: 'JavaScript', label: 'JavaScript' },
                { value: 'TypeScript', label: 'TypeScript' },
                { value: 'Node.js', label: 'Node.js' },
                { value: 'MongoDB', label: 'MongoDB' },
                { value: 'Express', label: 'Express' },
                { value: 'Next.js', label: 'Next.js' },
                { value: 'CSS', label: 'CSS' },
                { value: 'HTML', label: 'HTML' },
                { value: 'Tailwind', label: 'Tailwind' },
                { value: 'API', label: 'API' },
                { value: 'Frontend', label: 'Frontend' },
                { value: 'Backend', label: 'Backend' },
                { value: 'Full Stack', label: 'Full Stack' },
              ]}
              value={blogData.tags.map((tag) => ({ value: tag, label: tag }))}
              onChange={(selectedOptions) =>
                setBlogData({
                  ...blogData,
                  tags: selectedOptions.map((option) => option.value),
                })
              }
              className='basic-multi-select'
              classNamePrefix='select'
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Thumbnail Image
            </label>
            <div className='mt-1 flex items-center'>
              {thumbnailPreview ? (
                <div className='relative w-full max-w-xs'>
                  <Image
                    src={thumbnailPreview}
                    alt='Thumbnail preview'
                    width={300}
                    height={200}
                    className='object-cover rounded-md'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      setBlogData({ ...blogData, thumbnail: null });
                      setThumbnailPreview(null);
                    }}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1'
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <label className='w-full max-w-xs flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50'>
                  <div className='space-y-1 text-center'>
                    <FiImage className='mx-auto h-12 w-12 text-gray-400' />
                    <div className='flex text-sm text-gray-600'>
                      <span>Upload a file</span>
                      <input
                        id='thumbnail'
                        name='thumbnail'
                        type='file'
                        className='sr-only'
                        accept='image/*'
                        onChange={handleThumbnailChange}
                      />
                    </div>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Status
            </label>
            <div className='flex space-x-4'>
              <div className='flex items-center'>
                <input
                  id='draft'
                  name='status'
                  type='radio'
                  checked={blogData.status === 'draft'}
                  onChange={() => setBlogData({ ...blogData, status: 'draft' })}
                  className='h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500'
                />
                <label
                  htmlFor='draft'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Draft
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='published'
                  name='status'
                  type='radio'
                  checked={blogData.status === 'published'}
                  onChange={() =>
                    setBlogData({ ...blogData, status: 'published' })
                  }
                  className='h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500'
                />
                <label
                  htmlFor='published'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Published
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={() => router.push('/dashboard/my-blogs')}
              className='mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {isSubmitting ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
