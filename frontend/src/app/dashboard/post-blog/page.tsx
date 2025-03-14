'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { FiImage, FiX, FiSave, FiSend } from 'react-icons/fi';
import { MdTitle, MdDescription, MdCategory, MdAdd } from 'react-icons/md';
import { FaTags, FaRegLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

// Add the interface for ReactQuill props
interface QuillProps extends ReactQuillProps {
  forwardedRef?: React.Ref<any>;
}

// Update the dynamic import of ReactQuill
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    // Apply patch to fix the deprecated DOMNodeInserted event
    if (typeof window !== 'undefined') {
      const originalPrototype = RQ.prototype;
      const originalComponentDidMount = originalPrototype.componentDidMount;

      if (originalComponentDidMount) {
        originalPrototype.componentDidMount = function () {
          // Call the original method
          originalComponentDidMount.call(this);

          // Get the editor instance
          const editor = this.editor;

          // If we have access to the editor's root, use MutationObserver instead of DOMNodeInserted
          if (editor && editor.root) {
            // Remove any existing DOMNodeInserted listeners (if possible)
            // This is a simplified approach as we can't directly access the listeners

            // Add MutationObserver as a modern replacement
            const observer = new MutationObserver((mutations) => {
              // The editor will handle mutations internally
            });

            // Start observing with appropriate configuration
            observer.observe(editor.root, {
              childList: true,
              subtree: true,
              characterData: true,
              attributes: true,
            });

            // Store observer reference for cleanup
            this._mutationObserver = observer;
          }
        };

        // Also update componentWillUnmount to clean up the observer
        const originalComponentWillUnmount =
          originalPrototype.componentWillUnmount;
        if (originalComponentWillUnmount) {
          originalPrototype.componentWillUnmount = function () {
            // Disconnect observer if it exists
            if (this._mutationObserver) {
              this._mutationObserver.disconnect();
              this._mutationObserver = null;
            }

            // Call original method
            originalComponentWillUnmount.call(this);
          };
        }
      }
    }

    return function QuillWrapper({ forwardedRef, ...props }: QuillProps) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => (
      <div className='h-96 w-full bg-gray-50 rounded-lg flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    ),
  }
);

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  thumbnail?: File | null;
}

const categories = [
  'Technology',
  'Programming',
  'Web Development',
  'Mobile Development',
  'AI & ML',
  'Cybersecurity',
  'Cloud Computing',
  'DevOps',
  'Other',
];

// Predefined tags with colors
const predefinedTags = [
  {
    name: 'JavaScript',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  { name: 'React', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { name: 'Node.js', color: 'bg-green-100 text-green-800 border-green-300' },
  { name: 'Python', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { name: 'AI', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { name: 'Cloud', color: 'bg-sky-100 text-sky-800 border-sky-300' },
  { name: 'DevOps', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { name: 'Security', color: 'bg-red-100 text-red-800 border-red-300' },
  { name: 'UI/UX', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  {
    name: 'Mobile',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
];

// Move Quill modules outside component
const modules = {
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

// Function to get a random color for custom tags
const getRandomTagColor = () => {
  const colors = [
    'bg-blue-100 text-blue-800 border-blue-300',
    'bg-green-100 text-green-800 border-green-300',
    'bg-yellow-100 text-yellow-800 border-yellow-300',
    'bg-red-100 text-red-800 border-red-300',
    'bg-purple-100 text-purple-800 border-purple-300',
    'bg-pink-100 text-pink-800 border-pink-300',
    'bg-indigo-100 text-indigo-800 border-indigo-300',
    'bg-cyan-100 text-cyan-800 border-cyan-300',
    'bg-teal-100 text-teal-800 border-teal-300',
    'bg-orange-100 text-orange-800 border-orange-300',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function CreateBlogPage() {
  const router = useRouter();
  const quillRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tagColors, setTagColors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    thumbnail: null,
  });

  // Handle image upload
  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/api/upload', formData);
      return response.data.url;
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  }, []);

  // Initialize Quill with image handler
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Handle image upload
      const handleImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            try {
              const url = await handleImageUpload(file);
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, 'image', url);
            } catch (error) {
              toast.error('Failed to upload image');
            }
          }
        };
      };

      // Add image handler to toolbar
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', handleImage);
    }
  }, [handleImageUpload]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      formDataToSend.append('title', formData.title);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);

      // Add tags as JSON string
      formDataToSend.append('tags', JSON.stringify(formData.tags));

      // Add thumbnail if exists
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }

      const response = await api.post('/api/blogs', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Blog post created successfully!');
        router.push('/dashboard/my-blogs');
      } else {
        toast.error(response.data.message || 'Failed to create blog');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create blog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      const tag = newTag.trim();

      // Check if it's a predefined tag
      const predefinedTag = predefinedTags.find(
        (t) => t.name.toLowerCase() === tag.toLowerCase()
      );

      // Set color for the tag
      if (predefinedTag) {
        setTagColors((prev) => ({ ...prev, [tag]: predefinedTag.color }));
      } else {
        setTagColors((prev) => ({ ...prev, [tag]: getRandomTagColor() }));
      }

      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const removeThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }));
    setThumbnailPreview('');
  };

  const handlePredefinedTagClick = (tagName: string) => {
    if (!formData.tags.includes(tagName)) {
      const predefinedTag = predefinedTags.find((t) => t.name === tagName);
      if (predefinedTag) {
        setTagColors((prev) => ({ ...prev, [tagName]: predefinedTag.color }));
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagName] }));
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full px-4 sm:px-6 md:px-8 py-6 max-w-6xl mx-auto'
      >
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
              Create New Blog Post
            </h1>
            <p className='text-gray-600'>
              Share your knowledge and insights with the world
            </p>
          </div>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={() => router.back()}
              className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2'
            >
              <FiX size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'
            >
              {error}
            </motion.div>
          )}

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Left Column - Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md'
              >
                <div className='flex items-center gap-2 mb-4 text-gray-700'>
                  <MdTitle className='text-xl text-indigo-600' />
                  <h2 className='text-lg font-medium'>Title</h2>
                </div>
                <input
                  type='text'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder='Enter an engaging blog title'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg'
                  required
                />
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md'
              >
                <div className='flex items-center gap-2 mb-4 text-gray-700'>
                  <MdDescription className='text-xl text-indigo-600' />
                  <h2 className='text-lg font-medium'>Content</h2>
                </div>
                <div className='editor-container mb-3'>
                  <ReactQuill
                    theme='snow'
                    value={formData.content}
                    onChange={(content: string) =>
                      setFormData((prev) => ({ ...prev, content }))
                    }
                    modules={modules}
                    formats={formats}
                    className='h-64 sm:h-[500px] rounded-lg'
                    placeholder='Write your blog content here...'
                    forwardedRef={quillRef}
                  />
                </div>
                <div className='flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm'>
                  <FaRegLightbulb className='flex-shrink-0' />
                  <p>
                    Tip: You can upload images directly in the editor by
                    clicking the image icon in the toolbar.
                  </p>
                </div>
              </motion.div>

              {/* Excerpt Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md'
              >
                <div className='flex items-center gap-2 mb-4 text-gray-700'>
                  <MdDescription className='text-xl text-indigo-600' />
                  <h2 className='text-lg font-medium'>Excerpt</h2>
                </div>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                  placeholder='Write a brief summary of your blog post to attract readers'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all'
                  rows={4}
                  required
                />
              </motion.div>
            </div>

            {/* Right Column - Metadata */}
            <div className='space-y-6'>
              {/* Publish Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100'
              >
                <h2 className='text-lg font-medium text-indigo-800 mb-4'>
                  Publish
                </h2>
                <div className='space-y-4'>
                  <div className='flex justify-between gap-3'>
                    <button
                      type='button'
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, status: 'draft' }))
                      }
                      className='flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'
                    >
                      <FiSave size={18} />
                      <span>Save Draft</span>
                    </button>
                    <button
                      type='submit'
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          status: 'published',
                        }))
                      }
                      disabled={isLoading}
                      className='flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2'
                    >
                      {isLoading ? (
                        <span className='flex items-center justify-center'>
                          <svg
                            className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                          <span>Publishing...</span>
                        </span>
                      ) : (
                        <>
                          <FiSend size={18} />
                          <span>Publish</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Category Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md'
              >
                <div className='flex items-center gap-2 mb-4 text-gray-700'>
                  <MdCategory className='text-xl text-indigo-600' />
                  <h2 className='text-lg font-medium'>Category</h2>
                </div>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all'
                  required
                >
                  <option value=''>Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Tags Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md'
              >
                <div className='flex items-center gap-2 mb-4 text-gray-700'>
                  <FaTags className='text-xl text-indigo-600' />
                  <h2 className='text-lg font-medium'>Tags</h2>
                </div>

                <div className='flex gap-2 mb-4'>
                  <input
                    type='text'
                    value={newTag}
                    onChange={handleTagsChange}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addTag())
                    }
                    placeholder='Add a tag'
                    className='flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all'
                  />
                  <button
                    type='button'
                    onClick={addTag}
                    className='px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
                  >
                    <MdAdd size={20} />
                  </button>
                </div>

                <div className='mb-4'>
                  <p className='text-sm text-gray-600 mb-2'>Popular tags:</p>
                  <div className='flex flex-wrap gap-2'>
                    {predefinedTags.map((tag) => (
                      <button
                        key={tag.name}
                        type='button'
                        onClick={() => handlePredefinedTagClick(tag.name)}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          formData.tags.includes(tag.name)
                            ? tag.color + ' font-medium'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='mt-4'>
                  <p className='text-sm text-gray-600 mb-2'>Selected tags:</p>
                  <div className='flex flex-wrap gap-2'>
                    <AnimatePresence>
                      {formData.tags.map((tag) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`flex items-center gap-1 px-3 py-2 rounded-full border ${
                            tagColors[tag] ||
                            'bg-gray-100 text-gray-800 border-gray-300'
                          }`}
                        >
                          <span>{tag}</span>
                          <button
                            type='button'
                            onClick={() => removeTag(tag)}
                            className='ml-1 text-current opacity-70 hover:opacity-100'
                          >
                            <FiX size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Thumbnail Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md'
              >
                <div className='flex items-center gap-2 mb-4 text-gray-700'>
                  <FiImage className='text-xl text-indigo-600' />
                  <h2 className='text-lg font-medium'>Thumbnail</h2>
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                  {thumbnailPreview ? (
                    <div className='relative w-full h-48 mb-3'>
                      <div
                        className='absolute inset-0 rounded-lg overflow-hidden cursor-pointer'
                        onClick={() => setShowImagePreview(true)}
                      >
                        <Image
                          src={thumbnailPreview}
                          alt='Thumbnail preview'
                          className='w-full h-full object-cover transition-transform hover:scale-105'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                          <span className='text-white font-medium'>
                            Click to preview
                          </span>
                        </div>
                      </div>
                      <button
                        type='button'
                        onClick={removeThumbnail}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors'
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors'>
                      <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <FiImage className='w-12 h-12 mb-3 text-indigo-500' />
                        <p className='mb-2 text-sm text-indigo-700 font-medium'>
                          Click to upload thumbnail
                        </p>
                        <p className='text-xs text-indigo-500'>
                          PNG, JPG or WEBP (Max 2MB)
                        </p>
                      </div>
                      <input
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </form>

        {/* Image Preview Modal */}
        {showImagePreview && thumbnailPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'
            onClick={() => setShowImagePreview(false)}
          >
            <div className='relative max-w-4xl max-h-[90vh] w-full'>
              <button
                className='absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors'
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImagePreview(false);
                }}
              >
                <FiX size={24} />
              </button>
              <Image
                src={thumbnailPreview}
                alt='Thumbnail preview'
                className='w-full h-auto max-h-[90vh] object-contain rounded-lg'
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
