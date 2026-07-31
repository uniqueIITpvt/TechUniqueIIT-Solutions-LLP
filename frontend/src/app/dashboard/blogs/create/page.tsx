'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FaImage, FaPen, FaPlus, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { compressBlogThumbnail, formatImageSize } from '@/utils/imageCompression';

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

// Popular tags
const POPULAR_TAGS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'AI', 'Cloud', 'DevOps', 'Security', 'UI/UX', 'Mobile'
];

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  
  // Redirect non-admin users trying to access this page
  useEffect(() => {
    if (user && !isAdmin) {
      toast.error('Only admin or super admin users can create blog posts');
      router.push('/dashboard');
    }
  }, [user, isAdmin, router]);
  
  // If not admin, don't render the form at all
  if (!isAdmin) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-red-50 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-700">
            You need admin privileges to create blog posts. Please contact the administrator if you believe this is a mistake.
          </p>
        </div>
        <Link 
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Handle image selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error('Thumbnail must be a PNG, JPG, or WEBP image');
        e.target.value = '';
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        toast.error('Thumbnail must be smaller than 5MB');
        e.target.value = '';
        return;
      }

      try {
        const compressedFile = await compressBlogThumbnail(file);
        setFeaturedImage(compressedFile);
        toast.success(`Thumbnail compressed to ${formatImageSize(compressedFile.size)}`);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error: any) {
        console.error('Thumbnail compression failed:', error);
        toast.error(error.message || 'Failed to compress thumbnail');
        e.target.value = '';
      }
    }
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Add new tag
  const addNewTag = () => {
    if (newTag && newTag.trim() !== '' && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !content || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (excerpt.length > 500) {
      toast.error('Excerpt should be less than 500 characters');
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', excerpt);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('status', status);
      formData.append('tags', selectedTags.join(','));
      
      if (featuredImage) {
        formData.append('featuredImage', featuredImage);
      }
      
      const response = await api.post('/api/blogs', formData);
      
      if (response.data.success) {
        toast.success(status === 'published' ? 'Blog published successfully!' : 'Blog saved as draft!');
        router.push('/dashboard/my-blogs');
      } else {
        toast.error('Failed to create blog');
      }
    } catch (err: any) {
      console.error('Error creating blog:', err);
      toast.error(err.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create Post</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Writer'}</p>
        </div>
        <Link 
          href="/dashboard/blogs/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center font-medium hover:bg-indigo-700 transition-colors"
        >
          <FaPen className="mr-2" /> New Post
        </Link>
      </div> */}

      {/* Main content */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        {/* <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
            <p className="text-gray-600">Share your knowledge and insights with the world</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/my-blogs')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div> */}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-indigo-600 mr-2">T</span>
                <label htmlFor="title" className="font-medium text-gray-700">
                  Title
                </label>
              </div>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging blog title"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                required
              />
            </div>

            {/* Content */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-indigo-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </span>
                <label htmlFor="content" className="font-medium text-gray-700">
                  Content
                </label>
              </div>
              <div className="editor-container min-h-[300px]">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Write your blog content here..."
                  className="h-64 bg-white"
                />
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded flex items-start">
                <div className="text-blue-500 mr-4 mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 8C12.5523 8 13 8.44772 13 9V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V9C11 8.44772 11.4477 8 12 8ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-sm text-blue-700">
                  Tip: You can upload images directly in the editor by clicking the image icon in the toolbar.
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-indigo-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <label htmlFor="excerpt" className="font-medium text-gray-700">
                  Excerpt
                </label>
              </div>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief summary of your blog post to attract readers"
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>

          {/* Right Column (1/3 on desktop) */}
          <div className="space-y-6">
            {/* Publish Options */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-700 mb-4">Publish</h3>
              <p className="mb-4 text-sm text-gray-500">Only published blogs appear on the public blogs page.</p>
              <div className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">Current status: {status === 'published' ? 'Published' : 'Draft'}</div>
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('draft');
                    setTimeout(() => {
                      document.getElementById('submit-form-button')?.click();
                    }, 0);
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    status === 'draft' 
                      ? 'bg-gray-100 border-gray-300 text-gray-800' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('published');
                    setTimeout(() => { // Use setTimeout to ensure status is updated
                      document.getElementById('submit-form-button')?.click();
                    }, 0);
                  }}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Publish
                </button>
                {/* Hidden submit button that actually submits the form */}
                <button 
                  id="submit-form-button" 
                  type="submit" 
                  className="hidden"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-indigo-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                  </svg>
                </span>
                <label htmlFor="category" className="font-medium text-gray-700">
                  Category
                </label>
              </div>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                required
              >
                <option value="">Select category</option>
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-indigo-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  </svg>
                </span>
                <label className="font-medium text-gray-700">
                  Tags
                </label>
              </div>
              <div className="flex mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1 p-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addNewTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addNewTag}
                  className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700"
                >
                  <FaPlus />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Popular tags:</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-2 py-1 rounded-md ${
                        selectedTags.includes(tag)
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Selected tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="ml-1 text-indigo-600 hover:text-indigo-800"
                        >
                          ??
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-indigo-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                  </svg>
                </span>
                <label className="font-medium text-gray-700">
                  Thumbnail
                </label>
              </div>
              <div 
                className={`cursor-pointer border-2 border-dashed rounded-lg p-4 text-center ${
                  imagePreview ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="Thumbnail preview"
                      width={384}
                      height={192}
                      unoptimized
                      className="mx-auto max-h-48 w-auto rounded-lg object-contain"
                    />
                    <p className="mt-2 text-sm text-gray-600">Click to upload thumbnail</p>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="mb-2 text-indigo-600">
                      <FaImage className="mx-auto h-10 w-10" />
                    </div>
                    <p className="text-sm font-medium text-indigo-600">Click to upload thumbnail</p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 

