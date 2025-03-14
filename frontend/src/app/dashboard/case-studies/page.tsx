'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
  FiLoader,
  FiStar,
  FiCheck,
  FiX,
  FiAlertCircle,
} from 'react-icons/fi';
import { api } from '@/services/api';

interface Stat {
  label: string;
  value: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  client: string;
  duration: string;
  year: string;
  stats: Stat[];
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft';
  views: number;
  createdAt: string;
}

export default function CaseStudiesPage() {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch case studies
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError('You need to be logged in to view your case studies.');
          toast.error('Authentication required. Please log in.', {
            id: 'auth-required',
          });
          setIsLoading(false);
          // Redirect to login if no token is found
          router.push('/login');
          return;
        }

        try {
          // First try to get the user's case studies (protected route)
          const response = await api.get(`/api/case-studies/my-case-studies`);

          if (response.data && response.data.data) {
            // Handle nested data structure
            if (Array.isArray(response.data.data.data)) {
              setCaseStudies(response.data.data.data || []);
              const count = response.data.data.data.length;
              toast.success(
                `Loaded ${count} case ${count === 1 ? 'study' : 'studies'}`,
                {
                  id: 'case-studies-loaded',
                }
              );
            }
            // Handle flat data structure
            else if (Array.isArray(response.data.data)) {
              setCaseStudies(response.data.data || []);
              const count = response.data.data.length;
              toast.success(
                `Loaded ${count} case ${count === 1 ? 'study' : 'studies'}`,
                {
                  id: 'case-studies-loaded',
                }
              );
            } else {
              setCaseStudies([]);
              toast.success('No case studies found', {
                id: 'no-case-studies',
              });
            }
          } else {
            setCaseStudies([]);
            toast.success('No case studies found', {
              id: 'no-case-studies',
            });
          }
        } catch (apiError: any) {
          console.error('Error fetching case studies:', apiError);

          // Check if it's an authentication error
          if (apiError.response && apiError.response.status === 401) {
            setError('Your session has expired. Please log in again.');
            toast.error('Your session has expired. Please log in again.', {
              id: 'session-expired',
            });

            // Clear the token and redirect to login
            localStorage.removeItem('token');
            router.push('/login');
          } else {
            setError('Failed to fetch case studies. Please try again later.');
            toast.error(
              'Failed to fetch case studies. Please try again later.',
              {
                id: 'fetch-error',
              }
            );
          }

          setCaseStudies([]);
        }
      } catch (error) {
        console.error('Error in fetchCaseStudies:', error);
        setError('An unexpected error occurred. Please try again later.');
        toast.error('An unexpected error occurred. Please try again later.', {
          id: 'unexpected-error',
        });
        setCaseStudies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, [router]);

  // Filter case studies
  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    const matchesSearch =
      caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter
      ? caseStudy.category === categoryFilter
      : true;
    const matchesStatus = statusFilter
      ? caseStudy.status === statusFilter
      : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = [...new Set(caseStudies.map((cs) => cs.category))];

  // Handle delete
  const handleDelete = async (id: string) => {
    if (
      confirm(
        'Are you sure you want to delete this case study? This action cannot be undone.'
      )
    ) {
      setIsDeleting(id);
      const loadingToast = toast.loading('Deleting case study...', {
        id: `deleting-${id}`,
      });

      try {
        await api.delete(`/api/case-studies/${id}`);

        setCaseStudies(caseStudies.filter((cs) => cs._id !== id));
        toast.dismiss(loadingToast);
        toast.success('Case study deleted successfully', {
          id: `deleted-${id}`,
        });
      } catch (error: any) {
        console.error('Error deleting case study:', error);
        toast.dismiss(loadingToast);
        toast.error(
          error.response?.data?.message || 'Failed to delete case study',
          {
            id: `delete-error-${id}`,
          }
        );
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-64'>
        <FiLoader className='w-8 h-8 animate-spin text-indigo-600 mb-4' />
        <span className='text-lg'>Loading case studies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <FiAlertCircle className='w-12 h-12 text-red-500 mb-4' />
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            Error Loading Case Studies
          </h2>
          <p className='text-gray-600 mb-6 max-w-md'>{error}</p>
          <div className='space-y-4'>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              Retry
            </button>
            <div className='text-sm text-gray-500 mt-4'>
              <p>If the problem persists, please check:</p>
              <ul className='list-disc list-inside mt-2 text-left'>
                <li>Your API server is running</li>
                <li>
                  The API URL is correct:{' '}
                  <code className='bg-gray-100 px-2 py-1 rounded'>
                    /api/case-studies
                  </code>
                </li>
                <li>You are authenticated (token exists)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
        <h1 className='text-2xl font-bold'>Case Studies</h1>

        <Link
          href='/dashboard/case-studies/create'
          className='mt-4 sm:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          <FiPlus className='mr-2' />
          Add New Case Study
        </Link>
      </div>

      {/* Filters */}
      <div className='mb-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FiSearch className='text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search case studies...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FiFilter className='text-gray-400' />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FiFilter className='text-gray-400' />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value=''>All Statuses</option>
            <option value='published'>Published</option>
            <option value='draft'>Draft</option>
          </select>
        </div>
      </div>

      {/* Case Studies List */}
      {filteredCaseStudies.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg mb-4'>No case studies found</p>
          {searchTerm || categoryFilter || statusFilter ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setStatusFilter('');
              }}
              className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200'
            >
              Clear filters
            </button>
          ) : (
            <Link
              href='/dashboard/case-studies/create'
              className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
            >
              Create your first case study
            </Link>
          )}
        </div>
      ) : (
        <div className='overflow-x-auto -mx-6'>
          <div className='inline-block min-w-full align-middle px-6'>
            <div className='overflow-hidden border border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Case Study
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell'
                    >
                      Client
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'
                    >
                      Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell'
                    >
                      Views
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredCaseStudies.map((caseStudy) => (
                    <tr key={caseStudy._id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10 relative'>
                            <Image
                              src={caseStudy.image || '/placeholder-image.jpg'}
                              alt={caseStudy.title}
                              fill
                              className='rounded-md object-cover'
                            />
                          </div>
                          <div className='ml-4'>
                            <div className='flex items-center'>
                              <div className='text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-xs'>
                                {caseStudy.title}
                              </div>
                              {caseStudy.featured && (
                                <FiStar
                                  className='ml-1 text-yellow-500 flex-shrink-0'
                                  size={16}
                                />
                              )}
                            </div>
                            <div className='text-sm text-gray-500 truncate max-w-[150px] sm:max-w-xs'>
                              {caseStudy.description.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap hidden md:table-cell'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800'>
                          {caseStudy.category}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell'>
                        {caseStudy.client}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap hidden lg:table-cell'>
                        {caseStudy.status === 'published' ? (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            <FiCheck className='mr-1' /> Published
                          </span>
                        ) : (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                            <FiX className='mr-1' /> Draft
                          </span>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell'>
                        {formatDate(caseStudy.createdAt)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell'>
                        {caseStudy.views}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <div className='flex items-center justify-end space-x-2'>
                          <Link
                            href={`/case-studies/${caseStudy.slug}`}
                            target='_blank'
                            className='text-indigo-600 hover:text-indigo-900 p-1'
                            title='View'
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link
                            href={`/dashboard/case-studies/edit/${caseStudy._id}`}
                            className='text-blue-600 hover:text-blue-900 p-1'
                            title='Edit'
                            onClick={() => {
                              // Show a loading toast when navigating to edit page
                              toast.loading('Loading case study editor...');
                            }}
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(caseStudy._id)}
                            disabled={isDeleting === caseStudy._id}
                            className='text-red-600 hover:text-red-900 disabled:opacity-50 p-1'
                            title='Delete'
                          >
                            {isDeleting === caseStudy._id ? (
                              <FiLoader className='animate-spin' size={18} />
                            ) : (
                              <FiTrash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
