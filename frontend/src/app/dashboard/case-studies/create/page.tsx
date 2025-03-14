'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX, FiPlus, FiTrash, FiAlertCircle } from 'react-icons/fi';
import { api } from '@/services/api';
import Image from 'next/image';

// Remove or comment out this line as we'll use the api service instead
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const categories = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'E-commerce',
  'Cloud Solutions',
  'AI & ML',
  'DevOps',
  'Cybersecurity',
  'Other',
];

export default function CreateCaseStudy() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    client: '',
    duration: '',
    year: '',
    featured: false,
    status: 'published',
  });

  // Tags state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Stats state
  const [stats, setStats] = useState<{ label: string; value: string }[]>([
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ]);

  // Image state
  const [image, setImage] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Show toast for status change
    if (name === 'status') {
      toast.success(`Status set to ${value}`);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });

    // Show toast for featured toggle
    if (name === 'featured') {
      toast.success(
        checked
          ? 'Case study will be featured'
          : 'Case study will not be featured'
      );
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      toast.success(`Tag "${tagInput.trim()}" added`);
    } else if (tags.includes(tagInput.trim())) {
      toast.error('Tag already exists');
    } else {
      toast.error('Please enter a valid tag');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    toast.success(`Tag "${tagToRemove}" removed`);
  };

  const handleStatChange = (
    index: number,
    field: 'label' | 'value',
    value: string
  ) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  const addStat = () => {
    setStats([...stats, { label: '', value: '' }]);
    toast.success('New statistic added');
  };

  const removeStat = (index: number) => {
    if (stats.length > 1) {
      const newStats = [...stats];
      newStats.splice(index, 1);
      setStats(newStats);
      toast.success('Statistic removed');
    } else {
      toast.error('At least one statistic is required');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success('Image selected successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image removed');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validate form
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.content ||
      !image
    ) {
      toast.error('Please fill all required fields and upload an image', {
        id: 'validation-error',
      });
      return;
    }

    // Filter out empty stats
    const filteredStats = stats.filter(
      (stat) => stat.label.trim() && stat.value.trim()
    );
    if (filteredStats.length === 0) {
      toast.error('Please add at least one statistic', {
        id: 'stats-validation-error',
      });
      return;
    }

    setIsSubmitting(true);
    // Show loading toast
    const loadingToast = toast.loading('Creating case study...', {
      id: 'creating-case-study',
    });

    try {
      // Create FormData object
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('content', formData.content);
      data.append('client', formData.client);
      data.append('duration', formData.duration);
      data.append('year', formData.year);
      data.append('featured', formData.featured.toString());
      data.append('status', formData.status);

      // Append tags
      tags.forEach((tag) => {
        data.append('tags[]', tag);
      });

      // Append stats
      data.append('stats', JSON.stringify(filteredStats));

      // Append image if selected
      if (image) {
        data.append('image', image);
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You must be logged in to create a case study', {
          id: 'auth-required',
        });
        router.push('/login');
        return;
      }

      // Send request to API
      const response = await api.post(`/api/case-studies`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);
      toast.success('Case study created successfully!', {
        id: 'create-success',
      });

      // Redirect after a short delay to ensure the toast is seen
      setTimeout(() => {
        router.push('/dashboard/case-studies');
      }, 1500);
    } catch (error: any) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (error.response) {
        setApiError(
          `Server error: ${error.response.status} - ${
            error.response.data.message || 'Unknown error'
          }`
        );
      } else if (error.request) {
        setApiError(
          'No response from server. Please check your connection and ensure the API server is running.'
        );
      } else {
        setApiError(`Error: ${error.message}`);
      }

      toast.error(
        error.response?.data?.message || 'Failed to create case study',
        {
          id: 'create-error',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4 sm:p-6'>
      <h1 className='text-2xl font-bold mb-6'>Create New Case Study</h1>

      {apiError && (
        <div
          className='mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <div className='flex items-center'>
            <FiAlertCircle className='w-5 h-5 mr-2' />
            <span className='font-medium'>Error!</span>
          </div>
          <p className='mt-1'>{apiError}</p>
          <p className='mt-2 text-sm'>
            Please check that your API server is running at{' '}
            <code className='bg-red-100 px-1 py-0.5 rounded'>
              http://localhost:5000
            </code>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Title <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category <span className='text-red-500'>*</span>
            </label>
            <select
              name='category'
              value={formData.category}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            >
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Client Information */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Client <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='client'
              value={formData.client}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Duration <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='duration'
              value={formData.duration}
              onChange={handleInputChange}
              placeholder='e.g. 3 months'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Year <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='year'
              value={formData.year}
              onChange={handleInputChange}
              placeholder='e.g. 2023'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Short Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
            maxLength={500}
          />
          <p className='text-xs text-gray-500 mt-1'>
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Content */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Detailed Content <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='content'
            value={formData.content}
            onChange={handleInputChange}
            rows={8}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tags
          </label>
          <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
            <input
              type='text'
              value={tagInput}
              onChange={handleTagInputChange}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Add a tag and press Enter'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <button
              type='button'
              onClick={addTag}
              className='px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:flex-shrink-0'
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className='flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm'
                >
                  {tag}
                  <button
                    type='button'
                    onClick={() => removeTag(tag)}
                    className='ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none'
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div>
          <div className='flex items-center justify-between mb-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Statistics <span className='text-red-500'>*</span>
            </label>
            <button
              type='button'
              onClick={addStat}
              className='flex items-center text-sm text-indigo-600 hover:text-indigo-800'
            >
              <FiPlus size={16} className='mr-1' /> Add Stat
            </button>
          </div>

          <div className='space-y-3'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'
              >
                <input
                  type='text'
                  value={stat.label}
                  onChange={(e) =>
                    handleStatChange(index, 'label', e.target.value)
                  }
                  placeholder='Label (e.g. Increase in Sales)'
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
                <input
                  type='text'
                  value={stat.value}
                  onChange={(e) =>
                    handleStatChange(index, 'value', e.target.value)
                  }
                  placeholder='Value (e.g. 150%)'
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
                <button
                  type='button'
                  onClick={() => removeStat(index)}
                  className='p-2 text-red-600 hover:text-red-800 focus:outline-none sm:flex-shrink-0'
                  disabled={stats.length <= 1}
                >
                  <FiTrash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Case Study Image <span className='text-red-500'>*</span>
          </label>

          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
            <div className='space-y-1 text-center'>
              {imagePreview ? (
                <div className='relative'>
                  <Image
                    src={imagePreview}
                    alt='Preview'
                    width={300}
                    height={200}
                    className='mx-auto h-48 sm:h-64 object-cover rounded-md'
                  />
                  <button
                    type='button'
                    onClick={removeImage}
                    className='absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none'
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className='mx-auto h-12 w-12 text-gray-400' />
                  <div className='flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600'>
                    <label
                      htmlFor='image-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'
                    >
                      <span>Upload an image</span>
                      <input
                        id='image-upload'
                        name='image-upload'
                        type='file'
                        ref={fileInputRef}
                        className='sr-only'
                        accept='image/*'
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs text-gray-500'>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Publishing Options */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='featured'
              name='featured'
              checked={formData.featured}
              onChange={handleCheckboxChange}
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <label
              htmlFor='featured'
              className='ml-2 block text-sm text-gray-700'
            >
              Feature this case study
            </label>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value='published'>Published</option>
              <option value='draft'>Draft</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4'>
          <button
            type='button'
            onClick={() => router.back()}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 w-full sm:w-auto'
          >
            {isSubmitting ? 'Creating...' : 'Create Case Study'}
          </button>
        </div>
      </form>
    </div>
  );
}
