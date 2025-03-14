'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiEye,
  FiThumbsUp,
  FiCalendar,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiInfo,
} from 'react-icons/fi';
import {
  FaRegCommentDots,
  FaGlobe,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
} from 'react-icons/fa';

// Mock data for demonstration
const mockData = {
  overview: {
    totalViews: 24689,
    viewsChange: 12.8,
    totalReaders: 8432,
    readersChange: 8.3,
    totalLikes: 1245,
    likesChange: 15.7,
    totalComments: 683,
    commentsChange: -3.2,
  },
  postsPerformance: [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      views: 3245,
      likes: 187,
      comments: 42,
      engagement: 78,
    },
    {
      id: 2,
      title: 'Building Responsive Layouts with Tailwind CSS',
      views: 2876,
      likes: 156,
      comments: 38,
      engagement: 72,
    },
    {
      id: 3,
      title: 'Understanding TypeScript Generics',
      views: 2154,
      likes: 132,
      comments: 29,
      engagement: 65,
    },
    {
      id: 4,
      title: 'Next.js 13 Features Explained',
      views: 1987,
      likes: 124,
      comments: 31,
      engagement: 63,
    },
    {
      id: 5,
      title: 'Modern JavaScript Techniques',
      views: 1765,
      likes: 98,
      comments: 24,
      engagement: 58,
    },
  ],
  viewsByDevice: [
    { device: 'Mobile', percentage: 58, icon: <FaMobileAlt /> },
    { device: 'Desktop', percentage: 32, icon: <FaDesktop /> },
    { device: 'Tablet', percentage: 10, icon: <FaTabletAlt /> },
  ],
  topCountries: [
    { country: 'United States', views: 8765, percentage: 35.5 },
    { country: 'India', views: 4321, percentage: 17.5 },
    { country: 'United Kingdom', views: 2876, percentage: 11.6 },
    { country: 'Germany', views: 1987, percentage: 8.0 },
    { country: 'Canada', views: 1654, percentage: 6.7 },
  ],
  viewsOverTime: [
    { date: 'Jan', views: 1200 },
    { date: 'Feb', views: 1900 },
    { date: 'Mar', views: 1600 },
    { date: 'Apr', views: 2200 },
    { date: 'May', views: 2500 },
    { date: 'Jun', views: 2300 },
    { date: 'Jul', views: 2800 },
    { date: 'Aug', views: 3100 },
    { date: 'Sep', views: 3400 },
    { date: 'Oct', views: 3200 },
    { date: 'Nov', views: 3700 },
    { date: 'Dec', views: 4100 },
  ],
  recentActivity: [
    {
      type: 'comment',
      user: 'Sarah Johnson',
      content: 'Great article! This helped me understand hooks better.',
      post: 'Getting Started with React Hooks',
      time: '2 hours ago',
    },
    {
      type: 'like',
      user: 'Michael Chen',
      content: 'liked your post',
      post: 'Next.js 13 Features Explained',
      time: '4 hours ago',
    },
    {
      type: 'view',
      user: 'Anonymous',
      content: 'viewed your post',
      post: 'Building Responsive Layouts with Tailwind CSS',
      time: '5 hours ago',
    },
    {
      type: 'comment',
      user: 'Emily Rodriguez',
      content: "I've been using this approach in my projects. Works great!",
      post: 'Modern JavaScript Techniques',
      time: '1 day ago',
    },
    {
      type: 'like',
      user: 'David Kim',
      content: 'liked your post',
      post: 'Understanding TypeScript Generics',
      time: '1 day ago',
    },
  ],
};

// Time period options
const timePeriods = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '90days', label: 'Last 90 days' },
  { value: 'year', label: 'Last year' },
  { value: 'all', label: 'All time' },
];

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('30days');
  const [data, setData] = useState(mockData);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate data refresh when time period changes
  const refreshData = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    refreshData();
  }, [timePeriod, refreshData]);

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Analytics Dashboard
            </h1>
            <p className='text-gray-600 mt-1'>
              Track your blog performance and audience engagement
            </p>
          </motion.div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <div className='relative'>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className='appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              >
                {timePeriods.map((period) => (
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
              onClick={refreshData}
              disabled={isLoading}
              className='flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50'
            >
              <FiRefreshCw
                className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className='flex items-center justify-center h-96'>
            <div className='flex flex-col items-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
              <p className='mt-4 text-gray-600'>Loading analytics data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
              >
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Total Views
                    </p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      {formatNumber(data.overview.totalViews)}
                    </p>
                  </div>
                  <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600'>
                    <FiEye size={24} />
                  </div>
                </div>
                <div
                  className={`flex items-center mt-4 text-sm ${
                    data.overview.viewsChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.overview.viewsChange >= 0 ? (
                    <FiArrowUp className='mr-1' />
                  ) : (
                    <FiArrowDown className='mr-1' />
                  )}
                  <span>
                    {Math.abs(data.overview.viewsChange)}% from previous period
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
              >
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Total Readers
                    </p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      {formatNumber(data.overview.totalReaders)}
                    </p>
                  </div>
                  <div className='h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600'>
                    <FiUsers size={24} />
                  </div>
                </div>
                <div
                  className={`flex items-center mt-4 text-sm ${
                    data.overview.readersChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.overview.readersChange >= 0 ? (
                    <FiArrowUp className='mr-1' />
                  ) : (
                    <FiArrowDown className='mr-1' />
                  )}
                  <span>
                    {Math.abs(data.overview.readersChange)}% from previous
                    period
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
              >
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Total Likes
                    </p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      {formatNumber(data.overview.totalLikes)}
                    </p>
                  </div>
                  <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600'>
                    <FiThumbsUp size={24} />
                  </div>
                </div>
                <div
                  className={`flex items-center mt-4 text-sm ${
                    data.overview.likesChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.overview.likesChange >= 0 ? (
                    <FiArrowUp className='mr-1' />
                  ) : (
                    <FiArrowDown className='mr-1' />
                  )}
                  <span>
                    {Math.abs(data.overview.likesChange)}% from previous period
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
              >
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Total Comments
                    </p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      {formatNumber(data.overview.totalComments)}
                    </p>
                  </div>
                  <div className='h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600'>
                    <FaRegCommentDots size={24} />
                  </div>
                </div>
                <div
                  className={`flex items-center mt-4 text-sm ${
                    data.overview.commentsChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.overview.commentsChange >= 0 ? (
                    <FiArrowUp className='mr-1' />
                  ) : (
                    <FiArrowDown className='mr-1' />
                  )}
                  <span>
                    {Math.abs(data.overview.commentsChange)}% from previous
                    period
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Left Column */}
              <div className='lg:col-span-2 space-y-6'>
                {/* Views Over Time Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
                >
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      Views Over Time
                    </h2>
                    <button className='text-gray-500 hover:text-gray-700'>
                      <FiInfo size={18} />
                    </button>
                  </div>

                  <div className='h-64 relative'>
                    {/* Simplified chart visualization */}
                    <div className='absolute bottom-0 left-0 right-0 h-56 flex items-end'>
                      {data.viewsOverTime.map((month, index) => (
                        <div
                          key={month.date}
                          className='flex-1 flex flex-col items-center'
                        >
                          <div
                            className='w-full max-w-[30px] bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-sm mx-1'
                            style={{
                              height: `${(month.views / 4100) * 100}%`,
                              opacity:
                                index === data.viewsOverTime.length - 1
                                  ? 1
                                  : 0.7 + index * 0.02,
                            }}
                          ></div>
                          <span className='text-xs text-gray-500 mt-2'>
                            {month.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Top Performing Posts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
                >
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      Top Performing Posts
                    </h2>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-500'>Sort by:</span>
                      <select className='text-sm border-gray-300 rounded-md'>
                        <option>Views</option>
                        <option>Engagement</option>
                        <option>Likes</option>
                        <option>Comments</option>
                      </select>
                    </div>
                  </div>

                  <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                      <thead>
                        <tr className='border-b border-gray-200'>
                          <th className='py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Post Title
                          </th>
                          <th className='py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Views
                          </th>
                          <th className='py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Likes
                          </th>
                          <th className='py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Comments
                          </th>
                          <th className='py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Engagement
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.postsPerformance.map((post, index) => (
                          <tr
                            key={post.id}
                            className={
                              index !== data.postsPerformance.length - 1
                                ? 'border-b border-gray-100'
                                : ''
                            }
                          >
                            <td className='py-4 text-sm font-medium text-gray-900 truncate max-w-[200px]'>
                              {post.title}
                            </td>
                            <td className='py-4 text-sm text-gray-500 text-right'>
                              {formatNumber(post.views)}
                            </td>
                            <td className='py-4 text-sm text-gray-500 text-right'>
                              {formatNumber(post.likes)}
                            </td>
                            <td className='py-4 text-sm text-gray-500 text-right'>
                              {formatNumber(post.comments)}
                            </td>
                            <td className='py-4 text-right'>
                              <div className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                {post.engagement}%
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className='mt-4 text-center'>
                    <button className='text-indigo-600 hover:text-indigo-800 text-sm font-medium'>
                      View All Posts
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                {/* Device Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
                >
                  <h2 className='text-lg font-semibold text-gray-800 mb-6'>
                    Device Breakdown
                  </h2>

                  <div className='space-y-4'>
                    {data.viewsByDevice.map((device) => (
                      <div key={device.device} className='flex items-center'>
                        <div className='w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4'>
                          {device.icon}
                        </div>
                        <div className='flex-1'>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm font-medium text-gray-700'>
                              {device.device}
                            </span>
                            <span className='text-sm font-medium text-gray-700'>
                              {device.percentage}%
                            </span>
                          </div>
                          <div className='w-full bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-indigo-600 h-2 rounded-full'
                              style={{ width: `${device.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Geographic Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
                >
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      Geographic Distribution
                    </h2>
                    <div className='text-indigo-600 bg-indigo-100 p-2 rounded-full'>
                      <FaGlobe size={16} />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    {data.topCountries.map((country, index) => (
                      <div
                        key={country.country}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center'>
                          <div className='w-6 h-6 flex items-center justify-center font-medium text-xs text-gray-500 mr-3'>
                            {index + 1}
                          </div>
                          <span className='text-sm font-medium text-gray-800'>
                            {country.country}
                          </span>
                        </div>
                        <div className='text-sm text-gray-500'>
                          {formatNumber(country.views)} views
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='mt-6 pt-4 border-t border-gray-100'>
                    <button className='text-indigo-600 hover:text-indigo-800 text-sm font-medium'>
                      View Full Report
                    </button>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'
                >
                  <h2 className='text-lg font-semibold text-gray-800 mb-6'>
                    Recent Activity
                  </h2>

                  <div className='space-y-4'>
                    {data.recentActivity.map((activity, index) => (
                      <div key={index} className='flex'>
                        <div className='mr-4'>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activity.type === 'comment'
                                ? 'bg-orange-100 text-orange-600'
                                : activity.type === 'like'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-blue-100 text-blue-600'
                            }`}
                          >
                            {activity.type === 'comment' ? (
                              <FaRegCommentDots size={14} />
                            ) : activity.type === 'like' ? (
                              <FiThumbsUp size={14} />
                            ) : (
                              <FiEye size={14} />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className='text-sm text-gray-800'>
                            <span className='font-medium'>{activity.user}</span>{' '}
                            {activity.content}
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            <span className='font-medium'>{activity.post}</span>{' '}
                            • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='mt-6 pt-4 border-t border-gray-100'>
                    <button className='text-indigo-600 hover:text-indigo-800 text-sm font-medium'>
                      View All Activity
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
