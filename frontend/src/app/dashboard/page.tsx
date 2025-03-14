'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import {
  FaBlog,
  FaEye,
  FaThumbsUp,
  FaUsers,
  FaChartLine,
  FaBookOpen,
  FaProjectDiagram,
  FaRegNewspaper,
  FaRegCommentDots,
  FaRegClock,
  FaGlobe,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
} from 'react-icons/fa';
import {
  MdPublish,
  MdDrafts,
  MdTrendingUp,
  MdAccessTime,
  MdWorkOutline,
  MdOutlineBusinessCenter,
} from 'react-icons/md';
import {
  FiTrendingUp,
  FiUsers,
  FiEye,
  FiThumbsUp,
  FiCalendar,
  FiFilter,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiInfo,
} from 'react-icons/fi';
import { api } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  totalLikes: number;
}

interface RecentBlog {
  _id: string;
  title: string;
  views: number;
  likes: number;
  status: 'published' | 'draft';
  createdAt: string;
}

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

// Define interfaces for analytics data
interface AnalyticsOverview {
  totalViews: number;
  viewsChange: number;
  totalReaders: number;
  readersChange: number;
  totalLikes: number;
  likesChange: number;
  totalComments: number;
  commentsChange: number;
}

interface PostPerformance {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  engagement: number;
}

interface DeviceDistribution {
  device: string;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface CountryDistribution {
  country: string;
  views: number;
  percentage: number;
}

interface AnalyticsData {
  totalViews: number;
  totalReaders: number;
  totalLikes: number;
  totalComments: number;
  viewsChange: number;
  readersChange: number;
  likesChange: number;
  commentsChange: number;
  topPosts: PostData[];
  viewsByDevice: DeviceData[];
  viewsByGeo: GeoData[];
}

// Update the GeoData interface to include views
interface GeoData {
  country: string;
  percentage: number;
  views?: number; // Make views optional
}

// Update initialAnalyticsData to match AnalyticsData interface
const initialAnalyticsData: AnalyticsData = {
  totalViews: 0,
  totalReaders: 0,
  totalLikes: 0,
  totalComments: 0,
  viewsChange: 0,
  readersChange: 0,
  likesChange: 0,
  commentsChange: 0,
  topPosts: [],
  viewsByDevice: [
    { device: 'Mobile', percentage: 0, icon: FaMobileAlt },
    { device: 'Desktop', percentage: 0, icon: FaDesktop },
    { device: 'Tablet', percentage: 0, icon: FaTabletAlt },
  ],
  viewsByGeo: [],
};

// Update the mock analytics data to match our interface
const mockAnalyticsData: AnalyticsData = {
  totalViews: 24689,
  totalReaders: 18432,
  totalLikes: 8976,
  totalComments: 3254,
  viewsChange: 12.4,
  readersChange: 8.7,
  likesChange: 24.3,
  commentsChange: -5.8,
  topPosts: [
    {
      title: 'How to Implement AI in Your Business',
      views: 5432,
      likes: 1243,
      comments: 342,
      engagement: 78,
    },
    {
      title: 'The Future of Web Development',
      views: 4321,
      likes: 987,
      comments: 254,
      engagement: 65,
    },
    {
      title: 'Digital Marketing Strategies for 2023',
      views: 3876,
      likes: 765,
      comments: 198,
      engagement: 52,
    },
  ],
  viewsByDevice: [
    { device: 'Mobile', percentage: 68, icon: FaMobileAlt },
    { device: 'Desktop', percentage: 24, icon: FaDesktop },
    { device: 'Tablet', percentage: 8, icon: FaTabletAlt },
  ],
  viewsByGeo: [
    { country: 'United States', percentage: 42, views: 10367 },
    { country: 'India', percentage: 18, views: 4444 },
    { country: 'United Kingdom', percentage: 12, views: 2963 },
    { country: 'Germany', percentage: 8, views: 1975 },
    { country: 'Canada', percentage: 6, views: 1481 },
    { country: 'Others', percentage: 14, views: 3457 },
  ],
};

// Define interface for quick action items
interface QuickAction {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  href: string;
  onClick?: () => void;
}

// Define the DeviceData interface
interface DeviceData {
  device: string;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
}

// Define the PostData interface
interface PostData {
  title: string;
  views: number;
  likes: number;
  comments: number;
  engagement: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsData>(initialAnalyticsData);
  const [analyticsTimePeriod, setAnalyticsTimePeriod] = useState('30days');
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);

  // Define quick actions
  const quickActions: QuickAction[] = [
    {
      name: 'New Blog',
      icon: FaBlog,
      color: 'bg-blue-600',
      href: '/dashboard/blogs/create',
    },
    {
      name: 'New Case Study',
      icon: MdWorkOutline,
      color: 'bg-amber-600',
      href: '/dashboard/case-studies/create',
    },
    {
      name: 'Manage Case Studies',
      icon: FaProjectDiagram,
      color: 'bg-green-600',
      href: '/dashboard/case-studies',
    },
    {
      name: 'View Analytics',
      icon: FaChartLine,
      color: 'bg-purple-600',
      href: '/dashboard/analytics',
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Use Promise.allSettled instead of Promise.all to handle partial failures
        const results = await Promise.allSettled([
          api.get('/api/blogs'),
          api.get('/api/blogs/stats'),
          api.get('/api/case-studies'),
        ]);

        // Process blogs response
        if (results[0].status === 'fulfilled') {
          const blogsResponse = results[0].value;
          const blogs = blogsResponse.data.data.data || [];
          setRecentBlogs(blogs.slice(0, 5));
        } else {
          // Handle error silently
        }

        // Process stats response
        if (results[1].status === 'fulfilled') {
          const statsResponse = results[1].value;
          setStats(statsResponse.data.data);
        } else {
          // Handle error silently
        }

        // Process case studies response
        if (results[2].status === 'fulfilled') {
          const caseStudiesResponse = results[2].value;

          // Handle different response structures
          if (caseStudiesResponse.data.data.data) {
            const caseStudies = caseStudiesResponse.data.data.data || [];
            setCaseStudies(caseStudies.slice(0, 3));
          } else if (Array.isArray(caseStudiesResponse.data.data)) {
            const caseStudies = caseStudiesResponse.data.data || [];
            setCaseStudies(caseStudies.slice(0, 3));
          }
        } else {
          // Handle error silently
        }
      } catch (error) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch analytics data when time period changes
  useEffect(() => {
    fetchAnalyticsData(analyticsTimePeriod);
  }, [analyticsTimePeriod]);

  // Function to fetch analytics data
  const fetchAnalyticsData = async (period: string) => {
    setIsAnalyticsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would fetch data from an API
      // const response = await api.get(`/api/analytics?period=${period}`);
      // setAnalyticsData(response.data);

      // For now, use mock data
      setAnalyticsData(mockAnalyticsData);
    } catch (error) {
      // Removed console.error statement
      // Show a toast notification instead
      toast.error('Failed to load analytics data', {
        id: 'analytics-error',
      });
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  // Function to handle analytics refresh
  const handleAnalyticsRefresh = () => {
    fetchAnalyticsData(analyticsTimePeriod);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    bgColor,
    delay = 0,
  }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      className={`${bgColor} p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300`}
    >
      <div className='flex items-center'>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className='h-6 w-6 text-white' />
        </div>
        <div className='ml-4'>
          <p className='text-sm font-medium text-gray-600'>{title}</p>
          <h3 className='text-2xl font-bold text-gray-900 mt-1'>{value}</h3>
        </div>
      </div>
    </motion.div>
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (isLoading) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4'></div>
        <p className='text-gray-600 font-medium'>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center p-8 bg-red-50 rounded-lg border border-red-200 max-w-md shadow-lg'
        >
          <h2 className='text-xl font-bold text-red-700 mb-3'>
            Error Loading Dashboard
          </h2>
          <p className='text-red-600 mb-6'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200'
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='space-y-8 pb-10'>
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white mb-8'
      >
        <h1 className='text-2xl md:text-3xl font-bold'>Blog Dashboard</h1>
        <p className='mt-2 opacity-90'>
          Manage and monitor your blog performance
        </p>

        {/* Dashboard Tabs */}
        <div className='mt-6 flex space-x-2 overflow-x-auto pb-1'>
          {['overview', 'case-studies', 'analytics', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                ${
                  activeTab === tab
                    ? 'bg-white text-indigo-700'
                    : 'bg-indigo-700/30 text-white hover:bg-indigo-700/50'
                }`}
            >
              {tab
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className='space-y-8'>
              {/* Stats Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <StatCard
                  title='Total Blogs'
                  value={stats.totalBlogs}
                  icon={FaBlog}
                  color='bg-blue-600'
                  bgColor='bg-blue-50'
                  delay={0}
                />
                <StatCard
                  title='Published'
                  value={stats.publishedBlogs}
                  icon={MdPublish}
                  color='bg-green-600'
                  bgColor='bg-green-50'
                  delay={1}
                />
                <StatCard
                  title='Total Views'
                  value={stats.totalViews}
                  icon={FaEye}
                  color='bg-purple-600'
                  bgColor='bg-purple-50'
                  delay={2}
                />
                <StatCard
                  title='Total Likes'
                  value={stats.totalLikes}
                  icon={FaThumbsUp}
                  color='bg-pink-600'
                  bgColor='bg-pink-50'
                  delay={3}
                />
              </div>

              {/* Recent Blogs */}
              <motion.div
                variants={container}
                initial='hidden'
                animate='show'
                className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'
              >
                <div className='p-6 border-b border-gray-200 bg-gray-50'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h2 className='text-lg font-bold text-gray-900'>
                        Recent Blogs
                      </h2>
                      <p className='mt-1 text-sm text-gray-500'>
                        Latest blog posts from your collection
                      </p>
                    </div>
                    <button className='px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm'>
                      View All
                    </button>
                  </div>
                </div>

                {recentBlogs.length === 0 ? (
                  <div className='p-8 text-center text-gray-500'>
                    <MdDrafts className='mx-auto h-12 w-12 text-gray-400 mb-3' />
                    <p>No blogs found. Create your first blog post!</p>
                  </div>
                ) : (
                  <div className='divide-y divide-gray-200'>
                    {recentBlogs.map((blog, index) => (
                      <motion.div
                        key={blog._id}
                        variants={item}
                        className='p-6 hover:bg-gray-50 transition-colors'
                        whileHover={{ x: 5 }}
                      >
                        <div className='flex items-center justify-between flex-wrap gap-4'>
                          <div className='flex-1 min-w-0'>
                            <h3 className='text-base font-semibold text-gray-900 truncate'>
                              {blog.title}
                            </h3>
                            <div className='mt-2 flex items-center text-sm text-gray-500'>
                              <MdAccessTime className='mr-1.5 h-4 w-4' />
                              {new Date(blog.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </div>
                          </div>
                          <div className='flex items-center space-x-4'>
                            <div className='flex items-center text-sm text-gray-500'>
                              <FaEye className='mr-1.5 h-4 w-4' />
                              {blog.views}
                            </div>
                            <div className='flex items-center text-sm text-gray-500'>
                              <FaThumbsUp className='mr-1.5 h-4 w-4' />
                              {blog.likes}
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
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
                              {blog.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Featured Case Studies Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'
              >
                <div className='p-6 border-b border-gray-200 bg-gray-50'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h2 className='text-lg font-bold text-gray-900'>
                        Featured Case Studies
                      </h2>
                      <p className='mt-1 text-sm text-gray-500'>
                        Showcase of your best work and projects
                      </p>
                    </div>
                    <Link
                      href='/dashboard/case-studies'
                      className='px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm'
                    >
                      View All
                    </Link>
                  </div>
                </div>

                <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {caseStudies.length === 0 ? (
                    <div className='p-8 text-center text-gray-500 col-span-2'>
                      <MdWorkOutline className='mx-auto h-12 w-12 text-gray-400 mb-3' />
                      <p>
                        No case studies found. Create your first case study!
                      </p>
                      <Link
                        href='/dashboard/case-studies/create'
                        className='mt-4 inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors'
                      >
                        Create Case Study
                      </Link>
                    </div>
                  ) : (
                    caseStudies
                      .filter((study) => study.featured)
                      .slice(0, 2)
                      .map((study) => (
                        <motion.div
                          key={study._id}
                          whileHover={{ y: -5 }}
                          className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
                        >
                          <div
                            className='h-48 bg-gray-200 relative bg-cover bg-center'
                            style={{
                              backgroundImage: study.image
                                ? `url(${study.image})`
                                : 'none',
                            }}
                          >
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end'>
                              <div className='p-4 text-white'>
                                <h3 className='font-bold text-lg'>
                                  {study.title}
                                </h3>
                                <p className='text-white/80 text-sm'>
                                  {study.client}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className='p-4'>
                            <div className='flex justify-between items-center'>
                              <span className='bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full'>
                                {study.category}
                              </span>
                              <div className='flex items-center text-sm text-gray-500'>
                                <FaEye className='mr-1.5 h-3 w-3' />
                                {study.views || 0}
                              </div>
                            </div>
                            <div className='mt-3 flex justify-between'>
                              <div className='text-sm text-gray-500'>
                                <MdAccessTime className='inline mr-1 h-3 w-3' />
                                {formatDate(study.createdAt)}
                              </div>
                              <Link
                                href={`/dashboard/case-studies/edit/${study._id}`}
                                className='text-indigo-600 text-sm font-medium hover:text-indigo-800'
                              >
                                Edit Details
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'case-studies' && (
            <div className='space-y-6'>
              {/* Case Studies Header */}
              <div className='bg-white rounded-xl shadow-md p-6 border border-gray-200'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div>
                    <h2 className='text-xl font-bold text-gray-900'>
                      Case Studies
                    </h2>
                    <p className='text-gray-500 mt-1'>
                      Showcase your portfolio of client work and projects
                    </p>
                  </div>
                  <div className='flex space-x-3'>
                    <Link
                      href='/dashboard/case-studies/create'
                      className='px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center'
                    >
                      <MdPublish className='mr-1.5' /> New Case Study
                    </Link>
                    <Link
                      href='/dashboard/case-studies'
                      className='px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors shadow-sm'
                    >
                      Manage All
                    </Link>
                  </div>
                </div>
              </div>

              {/* Case Studies Grid */}
              {caseStudies.length === 0 ? (
                <div className='bg-white rounded-xl shadow-md p-12 border border-gray-200 text-center'>
                  <MdWorkOutline className='mx-auto h-16 w-16 text-gray-400 mb-4' />
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    No Case Studies Found
                  </h3>
                  <p className='text-gray-500 mb-6 max-w-md mx-auto'>
                    You haven't created any case studies yet. Showcase your work
                    by creating your first case study.
                  </p>
                  <Link
                    href='/dashboard/case-studies/create'
                    className='px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center'
                  >
                    <MdPublish className='mr-2' /> Create Your First Case Study
                  </Link>
                </div>
              ) : (
                <motion.div
                  variants={container}
                  initial='hidden'
                  animate='show'
                  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                  {caseStudies.slice(0, 6).map((study, index) => (
                    <motion.div
                      key={study._id}
                      variants={item}
                      whileHover={{
                        y: -8,
                        boxShadow:
                          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      }}
                      className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300'
                    >
                      <div
                        className='h-48 bg-gray-200 relative bg-cover bg-center'
                        style={{
                          backgroundImage: study.image
                            ? `url(${study.image})`
                            : 'none',
                        }}
                      >
                        {study.featured && (
                          <div className='absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full'>
                            Featured
                          </div>
                        )}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end'>
                          <div className='p-5 text-white'>
                            <h3 className='font-bold text-xl'>{study.title}</h3>
                            <p className='text-white/90'>{study.client}</p>
                          </div>
                        </div>
                      </div>
                      <div className='p-5'>
                        <div className='flex justify-between items-center mb-4'>
                          <span className='bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full'>
                            {study.category}
                          </span>
                          <div className='flex items-center text-sm text-gray-500'>
                            <FaEye className='mr-1.5 h-4 w-4' />
                            {study.views || 0}
                          </div>
                        </div>
                        <div className='flex items-center text-sm text-gray-500 mb-4'>
                          <MdAccessTime className='mr-1.5 h-4 w-4' />
                          {formatDate(study.createdAt)}
                        </div>
                        <div className='flex justify-between items-center'>
                          <Link
                            href={`/dashboard/case-studies/edit/${study._id}`}
                            className='text-indigo-600 hover:text-indigo-800 font-medium text-sm'
                          >
                            Edit Details
                          </Link>
                          <div className='flex space-x-2'>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${
                                  study.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                            >
                              {study.status === 'published' ? (
                                <MdPublish className='mr-1' />
                              ) : (
                                <MdDrafts className='mr-1' />
                              )}
                              {study.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {caseStudies.length > 0 && (
                <div className='flex justify-center mt-6'>
                  <Link
                    href='/dashboard/case-studies'
                    className='px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center'
                  >
                    View All Case Studies ({caseStudies.length})
                  </Link>
                </div>
              )}

              {/* Case Studies Stats */}
              {caseStudies.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                  <StatCard
                    title='Total Case Studies'
                    value={caseStudies.length}
                    icon={FaProjectDiagram}
                    color='bg-indigo-600'
                    bgColor='bg-indigo-50'
                    delay={0}
                  />
                  <StatCard
                    title='Published'
                    value={
                      caseStudies.filter(
                        (study) => study.status === 'published'
                      ).length
                    }
                    icon={MdPublish}
                    color='bg-green-600'
                    bgColor='bg-green-50'
                    delay={1}
                  />
                  <StatCard
                    title='Featured'
                    value={caseStudies.filter((study) => study.featured).length}
                    icon={FaBookOpen}
                    color='bg-amber-600'
                    bgColor='bg-amber-50'
                    delay={2}
                  />
                  <StatCard
                    title='Categories'
                    value={
                      new Set(caseStudies.map((study) => study.category)).size
                    }
                    icon={MdOutlineBusinessCenter}
                    color='bg-emerald-600'
                    bgColor='bg-emerald-50'
                    delay={3}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className='space-y-6'>
              {/* Analytics Header */}
              <div className='bg-white rounded-xl shadow-md p-6 border border-gray-200'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div>
                    <h2 className='text-xl font-bold text-gray-900'>
                      Analytics Dashboard
                    </h2>
                    <p className='text-gray-500 mt-1'>
                      Track your blog performance and audience engagement
                    </p>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='relative'>
                      <select
                        value={analyticsTimePeriod}
                        onChange={(e) => setAnalyticsTimePeriod(e.target.value)}
                        className='appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      >
                        {[
                          { value: '7days', label: 'Last 7 days' },
                          { value: '30days', label: 'Last 30 days' },
                          { value: '90days', label: 'Last 90 days' },
                          { value: 'year', label: 'Last year' },
                        ].map((period) => (
                          <option key={period.value} value={period.value}>
                            {period.label}
                          </option>
                        ))}
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <FiCalendar className='h-4 w-4' />
                      </div>
                    </div>

                    <button
                      onClick={handleAnalyticsRefresh}
                      disabled={isAnalyticsLoading}
                      className='flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50'
                    >
                      <FiRefreshCw
                        className={`h-4 w-4 ${
                          isAnalyticsLoading ? 'animate-spin' : ''
                        }`}
                      />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>
              </div>

              {isAnalyticsLoading ? (
                <div className='flex items-center justify-center h-64 bg-white rounded-xl shadow-md'>
                  <div className='flex flex-col items-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
                    <p className='mt-4 text-gray-600'>
                      Loading analytics data...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Overview Stats */}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                    <AnalyticCard
                      title='Total Views'
                      value={formatNumber(analyticsData.totalViews)}
                      change={analyticsData.viewsChange}
                      icon={FaEye}
                      color='bg-blue-600'
                      bgColor='bg-blue-50'
                    />
                    <AnalyticCard
                      title='Unique Readers'
                      value={formatNumber(analyticsData.totalReaders)}
                      change={analyticsData.readersChange}
                      icon={FaUsers}
                      color='bg-green-600'
                      bgColor='bg-green-50'
                    />
                    <AnalyticCard
                      title='Total Likes'
                      value={formatNumber(analyticsData.totalLikes)}
                      change={analyticsData.likesChange}
                      icon={FaThumbsUp}
                      color='bg-purple-600'
                      bgColor='bg-purple-50'
                    />
                    <AnalyticCard
                      title='Comments'
                      value={formatNumber(analyticsData.totalComments)}
                      change={analyticsData.commentsChange}
                      icon={FaRegCommentDots}
                      color='bg-pink-600'
                      bgColor='bg-pink-50'
                    />
                  </div>

                  {/* Top Performing Posts */}
                  <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'>
                    <div className='p-6 border-b border-gray-200 bg-gray-50'>
                      <h3 className='text-lg font-bold text-gray-900'>
                        Top Performing Posts
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        Your most viewed and engaged content
                      </p>
                    </div>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Post Title
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Views
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Likes
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Comments
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Engagement
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {analyticsData.topPosts.map((post, index) => (
                            <tr
                              key={index}
                              className='border-b border-gray-200 hover:bg-gray-50'
                            >
                              <td className='py-3 px-4'>
                                <div className='flex items-center'>
                                  <span className='font-medium text-gray-900 truncate max-w-xs'>
                                    {post.title}
                                  </span>
                                </div>
                              </td>
                              <td className='py-3 px-4 text-gray-700'>
                                {formatNumber(post.views)}
                              </td>
                              <td className='py-3 px-4 text-gray-700'>
                                {formatNumber(post.likes)}
                              </td>
                              <td className='py-3 px-4 text-gray-700'>
                                {formatNumber(post.comments)}
                              </td>
                              <td className='py-3 px-4'>
                                <div className='flex items-center'>
                                  <div className='w-full bg-gray-200 rounded-full h-2.5 mr-2'>
                                    <div
                                      className='bg-blue-600 h-2.5 rounded-full'
                                      style={{ width: `${post.engagement}%` }}
                                    ></div>
                                  </div>
                                  <span className='text-sm font-medium text-gray-900'>
                                    {post.engagement}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='p-4 border-t border-gray-200 bg-gray-50 text-right'>
                      <Link
                        href='/dashboard/analytics'
                        className='text-indigo-600 hover:text-indigo-800 text-sm font-medium'
                      >
                        View Full Analytics →
                      </Link>
                    </div>
                  </div>

                  {/* Audience Insights */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Device Distribution */}
                    <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'>
                      <div className='p-6 border-b border-gray-200 bg-gray-50'>
                        <h3 className='text-lg font-bold text-gray-900'>
                          Device Distribution
                        </h3>
                        <p className='mt-1 text-sm text-gray-500'>
                          How your audience accesses your content
                        </p>
                      </div>
                      <div className='p-6'>
                        {analyticsData.viewsByDevice.map((device) => (
                          <div key={device.device} className='mb-4 last:mb-0'>
                            <div className='flex items-center justify-between mb-2'>
                              <div className='flex items-center'>
                                {React.createElement(device.icon, {
                                  className: 'h-5 w-5 text-gray-500 mr-2',
                                })}
                                <span className='text-sm font-medium text-gray-700'>
                                  {device.device}
                                </span>
                              </div>
                              <span className='text-sm font-medium text-gray-900'>
                                {device.percentage}%
                              </span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2.5'>
                              <div
                                className={`h-2.5 rounded-full ${
                                  device.device === 'Mobile'
                                    ? 'bg-blue-600'
                                    : device.device === 'Desktop'
                                    ? 'bg-purple-600'
                                    : 'bg-green-600'
                                }`}
                                style={{ width: `${device.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Geographic Distribution */}
                    <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'>
                      <div className='px-6 py-4 border-b border-gray-200'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          Geographic Distribution
                        </h3>
                        <p className='mt-1 text-sm text-gray-500'>
                          Where your readers are located
                        </p>
                      </div>
                      <div className='p-6'>
                        {analyticsData.viewsByGeo.map((country) => (
                          <div key={country.country} className='mb-4 last:mb-0'>
                            <div className='flex items-center justify-between mb-2'>
                              <div className='flex items-center'>
                                <span className='text-sm font-medium text-gray-700'>
                                  {country.country}
                                </span>
                              </div>
                              <span className='text-sm font-medium text-gray-900'>
                                {country.percentage}%
                              </span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2.5'>
                              <div
                                className='bg-indigo-600 h-2.5 rounded-full'
                                style={{ width: `${country.percentage}%` }}
                              ></div>
                            </div>
                            <div className='mt-1 text-xs text-gray-500'>
                              {formatNumber(country.views || 0)} views
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* View Full Analytics Button */}
              <div className='flex justify-center mt-6'>
                <Link
                  href='/dashboard/analytics'
                  className='px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center'
                >
                  <FaChartLine className='mr-2' /> View Detailed Analytics
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className='bg-white rounded-xl shadow-md p-6 min-h-[300px] flex items-center justify-center'>
              <div className='text-center'>
                <MdDrafts className='mx-auto h-12 w-12 text-indigo-500 mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Content Management
                </h3>
                <p className='text-gray-500 max-w-md mx-auto'>
                  Manage all your blog content in one place. Create, edit, and
                  organize your posts efficiently.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='bg-white rounded-xl shadow-md border border-gray-200 p-6'
      >
        <h2 className='text-lg font-bold text-gray-900 mb-4'>Quick Actions</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {quickActions.map((action: QuickAction, index: number) => {
            const handleClick = (e: React.MouseEvent) => {
              if (action.onClick) {
                e.preventDefault();
                action.onClick();
              }
            };

            return (
              <Link
                key={action.name}
                href={action.href}
                onClick={handleClick}
                className='flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-full flex flex-col items-center'
                >
                  <div
                    className={`p-3 rounded-full ${action.color} text-white mb-3`}
                  >
                    <action.icon className='h-5 w-5' />
                  </div>
                  <span className='text-sm font-medium text-gray-700 text-center'>
                    {action.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// Analytics Card Component with proper TypeScript types
interface AnalyticCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

function AnalyticCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  bgColor,
}: AnalyticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      className={`${bgColor} p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className='h-6 w-6 text-white' />
          </div>
          <div className='ml-4'>
            <p className='text-sm font-medium text-gray-600'>{title}</p>
            <h3 className='text-2xl font-bold text-gray-900 mt-1'>{value}</h3>
          </div>
        </div>
        <div
          className={`flex items-center ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change >= 0 ? (
            <FiArrowUp className='mr-1' />
          ) : (
            <FiArrowDown className='mr-1' />
          )}
          <span className='text-sm font-medium'>
            {Math.abs(change).toFixed(1)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
