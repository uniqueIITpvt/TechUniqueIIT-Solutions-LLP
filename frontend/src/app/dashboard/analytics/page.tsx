'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBriefcase,
  FiEdit3,
  FiEye,
  FiFileText,
  FiInbox,
  FiMessageSquare,
  FiRefreshCw,
  FiUsers,
} from 'react-icons/fi';
import {
  AnalyticsActivity,
  AnalyticsData,
  AnalyticsStatusItem,
  analyticsAdminApi,
} from '@/services/analyticsService';

const timePeriods = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '90days', label: 'Last 90 days' },
  { value: 'year', label: 'Last year' },
  { value: 'all', label: 'All time' },
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-IN').format(value);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

function ChangeText({ value }: { value: number | null }) {
  if (value === null) {
    return <span className='text-gray-400'>All-time total</span>;
  }

  const isPositive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        isPositive ? 'text-emerald-600' : 'text-red-600'
      }`}
    >
      {isPositive ? <FiArrowUp /> : <FiArrowDown />}
      {Math.abs(value)}% vs previous period
    </span>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
  accentClass,
}: {
  title: string;
  value: number;
  change: number | null;
  icon: ReactNode;
  accentClass: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <p className='text-sm font-medium text-gray-500'>{title}</p>
          <p className='mt-2 text-2xl font-bold text-gray-900'>
            {formatNumber(value)}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${accentClass}`}
        >
          {icon}
        </div>
      </div>
      <p className='mt-4 text-xs font-medium'>
        <ChangeText value={change} />
      </p>
    </motion.div>
  );
}

function StatusBreakdown({
  title,
  items,
}: {
  title: string;
  items: AnalyticsStatusItem[];
}) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'>
      <h2 className='text-base font-semibold text-gray-900'>{title}</h2>
      <div className='mt-5 space-y-4'>
        {items.map((item) => (
          <div key={item.label}>
            <div className='mb-1.5 flex items-center justify-between text-sm'>
              <span className='font-medium text-gray-700'>{item.label}</span>
              <span className='text-gray-500'>
                {formatNumber(item.count)} ({item.percentage}%)
              </span>
            </div>
            <div className='h-2 rounded-full bg-gray-100'>
              <div
                className='h-2 rounded-full bg-indigo-600'
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const activityConfig: Record<
  AnalyticsActivity['type'],
  { icon: ReactNode; className: string }
> = {
  blog: {
    icon: <FiFileText />,
    className: 'bg-blue-50 text-blue-600',
  },
  message: {
    icon: <FiMessageSquare />,
    className: 'bg-amber-50 text-amber-600',
  },
  application: {
    icon: <FiUsers />,
    className: 'bg-emerald-50 text-emerald-600',
  },
};

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState('30days');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await analyticsAdminApi.getAnalytics(timePeriod);
      setData(result.data);
    } catch (loadError) {
      setError(
        getErrorMessage(loadError, 'Analytics data could not be loaded.')
      );
    } finally {
      setIsLoading(false);
    }
  }, [timePeriod]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const maxActivity = useMemo(() => {
    if (!data?.trend.length) return 1;
    return Math.max(...data.trend.map((item) => item.totalActivity), 1);
  }, [data]);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Analytics Dashboard</h2>
          <p className='mt-1 text-sm text-gray-500'>
            Real data from blogs, contact messages, jobs, and applications.
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <select
            value={timePeriod}
            onChange={(event) => setTimePeriod(event.target.value)}
            className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
          >
            {timePeriods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <button
            type='button'
            onClick={loadAnalytics}
            disabled={isLoading}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      )}

      {isLoading && !data ? (
        <div className='flex min-h-[420px] items-center justify-center rounded-lg border border-gray-200 bg-white'>
          <div className='text-center'>
            <div className='mx-auto h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent' />
            <p className='mt-4 text-sm text-gray-500'>Loading real analytics data...</p>
          </div>
        </div>
      ) : data ? (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            <MetricCard
              title='Total Blog Views'
              value={data.overview.totalViews}
              change={data.overview.viewsChange}
              icon={<FiEye size={22} />}
              accentClass='bg-blue-50 text-blue-600'
            />
            <MetricCard
              title='Blog Posts'
              value={data.overview.totalBlogs}
              change={data.overview.blogsChange}
              icon={<FiEdit3 size={22} />}
              accentClass='bg-violet-50 text-violet-600'
            />
            <MetricCard
              title='Client Messages'
              value={data.overview.totalMessages}
              change={data.overview.messagesChange}
              icon={<FiInbox size={22} />}
              accentClass='bg-amber-50 text-amber-600'
            />
            <MetricCard
              title='Job Applications'
              value={data.overview.totalApplications}
              change={data.overview.applicationsChange}
              icon={<FiBriefcase size={22} />}
              accentClass='bg-emerald-50 text-emerald-600'
            />
          </div>

          <div className='grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]'>
            <div className='space-y-6'>
              <div className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'>
                <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                  <div>
                    <h2 className='text-base font-semibold text-gray-900'>
                      Activity Trend
                    </h2>
                    <p className='mt-1 text-xs text-gray-500'>
                      Blogs created, messages received, and applications submitted for {data.periodLabel.toLowerCase()}.
                    </p>
                  </div>
                  <span className='text-xs text-gray-400'>
                    Updated {formatDate(data.generatedAt)}
                  </span>
                </div>

                <div className='mt-6 flex h-64 items-end gap-2 overflow-x-auto pb-2'>
                  {data.trend.map((item) => (
                    <div
                      key={item.key}
                      className='flex min-w-10 flex-1 flex-col items-center justify-end gap-2'
                      title={`${item.label}: ${item.totalActivity} activity`}
                    >
                      <div className='flex h-48 w-full items-end justify-center'>
                        <div
                          className='w-full max-w-8 rounded-t bg-indigo-600 transition-all'
                          style={{
                            height: `${Math.max(6, (item.totalActivity / maxActivity) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className='max-w-16 truncate text-[11px] text-gray-500'>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className='mt-4 grid gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:grid-cols-4'>
                  <span>Blogs: {formatNumber(data.trend.reduce((sum, item) => sum + item.blogs, 0))}</span>
                  <span>Messages: {formatNumber(data.trend.reduce((sum, item) => sum + item.messages, 0))}</span>
                  <span>Applications: {formatNumber(data.trend.reduce((sum, item) => sum + item.applications, 0))}</span>
                  <span>Post views: {formatNumber(data.trend.reduce((sum, item) => sum + item.views, 0))}</span>
                </div>
              </div>

              <div className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'>
                <div className='mb-5 flex items-center justify-between gap-3'>
                  <h2 className='text-base font-semibold text-gray-900'>Top Blog Posts</h2>
                  <span className='text-xs text-gray-500'>Sorted by real view count</span>
                </div>

                <div className='overflow-x-auto'>
                  <table className='min-w-full text-sm'>
                    <thead>
                      <tr className='border-b border-gray-100 text-left text-xs uppercase text-gray-400'>
                        <th className='py-3 pr-4 font-semibold'>Post</th>
                        <th className='py-3 px-4 font-semibold'>Category</th>
                        <th className='py-3 px-4 font-semibold'>Status</th>
                        <th className='py-3 px-4 text-right font-semibold'>Views</th>
                        <th className='py-3 pl-4 text-right font-semibold'>Read</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topPosts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className='py-8 text-center text-gray-500'>
                            No blog posts found.
                          </td>
                        </tr>
                      ) : (
                        data.topPosts.map((post) => (
                          <tr key={post.id} className='border-b border-gray-50 last:border-0'>
                            <td className='max-w-[280px] py-4 pr-4'>
                              <p className='truncate font-semibold text-gray-900'>{post.title}</p>
                              <p className='mt-1 text-xs text-gray-400'>{formatDate(post.createdAt)}</p>
                            </td>
                            <td className='px-4 py-4 text-gray-600'>{post.category}</td>
                            <td className='px-4 py-4'>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                                  post.status === 'published'
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {post.status}
                              </span>
                            </td>
                            <td className='px-4 py-4 text-right font-semibold text-gray-900'>
                              {formatNumber(post.views)}
                            </td>
                            <td className='py-4 pl-4 text-right text-gray-500'>
                              {post.readTime} min
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <StatusBreakdown title='Blog Status' items={data.blogStatus} />
              <StatusBreakdown title='Message Status' items={data.messageStatus} />

              <div className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'>
                <h2 className='text-base font-semibold text-gray-900'>Applications by Department</h2>
                <div className='mt-5 space-y-4'>
                  {data.applicationsByDepartment.length === 0 ? (
                    <p className='text-sm text-gray-500'>No applications submitted yet.</p>
                  ) : (
                    data.applicationsByDepartment.map((item) => (
                      <div key={item.department}>
                        <div className='mb-1.5 flex items-center justify-between text-sm'>
                          <span className='font-medium text-gray-700'>{item.department}</span>
                          <span className='text-gray-500'>{formatNumber(item.applications)}</span>
                        </div>
                        <div className='h-2 rounded-full bg-gray-100'>
                          <div
                            className='h-2 rounded-full bg-emerald-600'
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'>
                <div className='mb-5 flex items-center gap-2'>
                  <FiActivity className='text-indigo-600' />
                  <h2 className='text-base font-semibold text-gray-900'>Recent Activity</h2>
                </div>
                <div className='space-y-4'>
                  {data.recentActivity.length === 0 ? (
                    <p className='text-sm text-gray-500'>No recent activity yet.</p>
                  ) : (
                    data.recentActivity.map((activity) => {
                      const config = activityConfig[activity.type];
                      return (
                        <div key={`${activity.type}-${activity.id}`} className='flex gap-3'>
                          <div
                            className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${config.className}`}
                          >
                            {config.icon}
                          </div>
                          <div className='min-w-0'>
                            <p className='truncate text-sm font-semibold text-gray-900'>
                              {activity.title}
                            </p>
                            <p className='mt-0.5 line-clamp-2 text-xs text-gray-500'>
                              {activity.subtitle}
                            </p>
                            <p className='mt-1 text-[11px] text-gray-400'>
                              {formatDate(activity.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}