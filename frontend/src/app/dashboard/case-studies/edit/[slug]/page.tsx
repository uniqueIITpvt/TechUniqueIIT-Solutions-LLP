'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX, FiPlus, FiTrash, FiLoader } from 'react-icons/fi';
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

export default function EditCaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caseStudyId, setCaseStudyId] = useState<string>('');

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
  ]);

  // Image state
  const [image, setImage] = useState<File | null>(null);

  // Fetch case study data
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setIsLoading(true);
        // The slug parameter is actually the case study ID
        const caseStudyId = params.slug;
        setCaseStudyId(caseStudyId);

        const response = await api.get(`/api/case-studies/${caseStudyId}`);

        if (!response.data || !response.data.data) {
          toast.error('Failed to load case study data');
          router.push('/dashboard/case-studies');
          return;
        }

        const caseStudy = response.data.data;

        // Set form data
        setFormData({
          title: caseStudy.title || '',
          category: caseStudy.category || '',
          description: caseStudy.description || '',
          content: caseStudy.content || '',
          client: caseStudy.client || '',
          duration: caseStudy.duration || '',
          year: caseStudy.year || '',
          featured: caseStudy.featured || false,
          status: caseStudy.status || 'published',
        });

        // Set tags
        setTags(caseStudy.tags || []);

        // Set stats
        if (caseStudy.stats && caseStudy.stats.length > 0) {
          setStats(caseStudy.stats);
        }

        // Set image preview
        if (caseStudy.image) {
          setImagePreview(caseStudy.image);
        }
      } catch (error: any) {
        console.error('Error fetching case study:', error);
        toast.error(
          error.response?.data?.message || 'Failed to load case study'
        );
        router.push('/dashboard/case-studies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [params.slug, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Show toast for status change
    if (name === 'status') {
      toast.success(`Status changed to ${value}`);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });

    // Show toast for featured toggle
    if (name === 'featured') {
      toast.success(
        checked
          ? 'Case study marked as featured'
          : 'Case study unmarked as featured'
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

    // Validate form
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.content
    ) {
      toast.error('Please fill all required fields', {
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
    const loadingToast = toast.loading('Updating case study...', {
      id: 'updating-case-study',
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

      // Append image if changed
      if (image) {
        data.append('image', image);
      }

      // Send request to API using the case study ID
      const response = await api.put(`/api/case-studies/${caseStudyId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Dismiss loading toast and show success toast
      toast.dismiss(loadingToast);
      toast.success('Case study updated successfully!', {
        id: 'update-success',
      });

      // Redirect after a short delay to ensure the toast is seen
      setTimeout(() => {
        router.push('/dashboard/case-studies');
      }, 1500);
    } catch (error: any) {
      console.error('Error updating case study:', error);
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message || 'Failed to update case study',
        {
          id: 'update-error',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <FiLoader className='w-8 h-8 animate-spin text-indigo-600' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Edit Case Study</h1>

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
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
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
          <select
            id='category'
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
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

        {/* Description */}
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Short Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
          ></textarea>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Full Content <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='content'
            name='content'
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
          ></textarea>
        </div>

        {/* Client */}
        <div>
          <label
            htmlFor='client'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Client
          </label>
          <input
            type='text'
            id='client'
            name='client'
            value={formData.client}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor='duration'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Duration
          </label>
          <input
            type='text'
            id='duration'
            name='duration'
            value={formData.duration}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='e.g. 3 months'
          />
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor='year'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Year
          </label>
          <input
            type='text'
            id='year'
            name='year'
            value={formData.year}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='e.g. 2023'
          />
        </div>

        {/* Tags */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tags
          </label>
          <div className='flex flex-wrap gap-2 mb-2'>
            {tags.map((tag) => (
              <div
                key={tag}
                className='flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full'
              >
                <span className='text-sm'>{tag}</span>
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  className='ml-2 text-indigo-600 hover:text-indigo-800'
                >
                  <FiX className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
          <div className='flex'>
            <input
              type='text'
              value={tagInput}
              onChange={handleTagInputChange}
              className='flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Add a tag'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <button
              type='button'
              onClick={addTag}
              className='px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <FiPlus className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Statistics <span className='text-red-500'>*</span>
          </label>
          <div className='space-y-3'>
            {stats.map((stat, index) => (
              <div key={index} className='flex gap-2'>
                <input
                  type='text'
                  value={stat.label}
                  onChange={(e) =>
                    handleStatChange(index, 'label', e.target.value)
                  }
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Label (e.g. Conversion Rate)'
                />
                <input
                  type='text'
                  value={stat.value}
                  onChange={(e) =>
                    handleStatChange(index, 'value', e.target.value)
                  }
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='Value (e.g. 25%)'
                />
                <button
                  type='button'
                  onClick={() => removeStat(index)}
                  className='px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 focus:outline-none'
                  disabled={stats.length <= 1}
                >
                  <FiTrash className='w-5 h-5' />
                </button>
              </div>
            ))}
          </div>
          <button
            type='button'
            onClick={addStat}
            className='mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800'
          >
            <FiPlus className='w-4 h-4 mr-1' /> Add Another Statistic
          </button>
        </div>

        {/* Featured & Status */}
        <div className='flex flex-col sm:flex-row gap-6'>
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
              Featured Case Study
            </label>
          </div>

          <div className='flex items-center space-x-4'>
            <span className='text-sm font-medium text-gray-700'>Status:</span>
            <div className='flex items-center'>
              <input
                type='radio'
                id='published'
                name='status'
                value='published'
                checked={formData.status === 'published'}
                onChange={handleInputChange}
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
              />
              <label
                htmlFor='published'
                className='ml-2 block text-sm text-gray-700'
              >
                Published
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                id='draft'
                name='status'
                value='draft'
                checked={formData.status === 'draft'}
                onChange={handleInputChange}
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
              />
              <label
                htmlFor='draft'
                className='ml-2 block text-sm text-gray-700'
              >
                Draft
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Featured Image
          </label>
          <div className='mt-1 flex items-center'>
            <div className='flex-1'>
              <div className='flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                  {imagePreview ? (
                    <div className='relative'>
                      <Image
                        src={imagePreview}
                        alt='Preview'
                        width={128}
                        height={128}
                        className='mx-auto h-32 w-auto object-cover'
                      />
                      <button
                        type='button'
                        onClick={removeImage}
                        className='absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1'
                      >
                        <FiX className='w-4 h-4' />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUpload className='mx-auto h-12 w-12 text-gray-400' />
                      <div className='flex text-sm text-gray-600'>
                        <label
                          htmlFor='image-upload'
                          className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'
                        >
                          <span>Upload a file</span>
                          <input
                            id='image-upload'
                            name='image-upload'
                            type='file'
                            className='sr-only'
                            accept='image/*'
                            ref={fileInputRef}
                            onChange={handleImageChange}
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
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => router.push('/dashboard/case-studies')}
            className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center'
          >
            {isSubmitting && (
              <FiLoader className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' />
            )}
            Update Case Study
          </button>
        </div>
      </form>
    </div>
  );
}
