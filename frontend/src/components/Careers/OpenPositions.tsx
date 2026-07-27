'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { JobApplicationModal } from '@/components/Careers/JobApplicationModal';
import { jobApi } from '@/services/jobService';
import { Job } from '@/types/job';

const getErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }

  return 'Open positions could not be loaded. Please try again.';
};

const formatPostedDate = (value: string) => {
  const createdAt = new Date(value);
  const days = Math.max(
    0,
    Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;

  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(
    createdAt
  );
};

export const OpenPositions = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applicationJob, setApplicationJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadJobs = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await jobApi.getPublished();
      setJobs(result.data);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const departments = useMemo(
    () => [
      'All',
      ...Array.from(new Set(jobs.map((job) => job.department))).sort(),
    ],
    [jobs]
  );

  const filteredPositions = useMemo(
    () =>
      selectedDepartment === 'All'
        ? jobs
        : jobs.filter((job) => job.department === selectedDepartment),
    [jobs, selectedDepartment]
  );

  return (
    <section
      id='open-positions'
      className='bg-gray-50 py-12 sm:py-16 lg:py-20'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-12 max-w-3xl text-center'
        >
          <span className='mb-4 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700'>
            Open Positions
          </span>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
            Current Opportunities
          </h2>
          <p className='text-lg text-gray-600'>
            Every role shown below is published and maintained by the
            TechUniqueIIT team.
          </p>
        </motion.div>

        {!isLoading && !error && departments.length > 1 && (
          <div className='mb-12 flex flex-wrap justify-center gap-3'>
            {departments.map((department, index) => (
              <motion.button
                key={department}
                type='button'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  setSelectedDepartment(department);
                  setExpandedId(null);
                }}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedDepartment === department
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {department}
              </motion.button>
            ))}
          </div>
        )}

        <div className='mx-auto grid max-w-4xl gap-6'>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='animate-pulse rounded-2xl border border-gray-100 bg-white p-6 sm:p-8'
              >
                <div className='h-6 w-2/3 rounded bg-gray-200' />
                <div className='mt-4 flex gap-3'>
                  <div className='h-7 w-24 rounded-full bg-gray-100' />
                  <div className='h-7 w-20 rounded-full bg-gray-100' />
                  <div className='h-7 w-24 rounded-full bg-gray-100' />
                </div>
                <div className='mt-6 h-4 w-full rounded bg-gray-100' />
              </div>
            ))
          ) : error ? (
            <div className='rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm'>
              <p className='font-medium text-red-600'>{error}</p>
              <button
                type='button'
                onClick={loadJobs}
                className='mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700'
              >
                Try Again
              </button>
            </div>
          ) : filteredPositions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm'
            >
              <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600'>
                <svg
                  className='h-7 w-7'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.8}
                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <p className='text-lg font-semibold text-gray-800'>
                No open positions right now
              </p>
              <p className='mt-2 text-sm text-gray-500'>
                Please check back soon for new opportunities.
              </p>
            </motion.div>
          ) : (
            filteredPositions.map((job, index) => {
              const isExpanded = expandedId === job._id;

              return (
                <motion.article
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl'
                >
                  <div className='p-6 sm:p-8'>
                    <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-start'>
                      <div className='min-w-0 flex-1'>
                        <h3 className='text-xl font-bold text-gray-900'>
                          {job.title}
                        </h3>
                        <div className='mt-3 flex flex-wrap gap-3'>
                          <span className='inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600'>
                            {job.department}
                          </span>
                          <span className='inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600'>
                            {job.workplaceType}
                          </span>
                          <span className='inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600'>
                            {job.employmentType}
                          </span>
                        </div>
                        <p className='mt-4 text-sm leading-6 text-gray-600'>
                          {job.summary}
                        </p>
                      </div>

                      <div className='flex-shrink-0 sm:text-right'>
                        {job.salary && (
                          <div className='text-lg font-semibold text-gray-900'>
                            {job.salary}
                          </div>
                        )}
                        <div className='mt-1 text-sm text-gray-500'>
                          {job.location}
                        </div>
                        <div className='mt-1 text-xs text-gray-400'>
                          {formatPostedDate(job.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 flex flex-col justify-between gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center'>
                      <button
                        type='button'
                        onClick={() =>
                          setExpandedId(isExpanded ? null : job._id)
                        }
                        aria-expanded={isExpanded}
                        className='inline-flex items-center font-medium text-indigo-600 hover:text-indigo-700'
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        <svg
                          className={`ml-2 h-4 w-4 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </button>
                      <button
                          type='button'
                          onClick={() => setApplicationJob(job)}
                          className='inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700'
                        >
                          Apply Now
                        </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                      >
                        <div className='border-t border-gray-100 bg-gray-50 px-6 py-6 sm:px-8'>
                          <h4 className='font-semibold text-gray-900'>About the role</h4>
                          <p className='mt-3 whitespace-pre-line text-sm leading-7 text-gray-600'>
                            {job.description}
                          </p>

                          {job.requirements.length > 0 && (
                            <div className='mt-6'>
                              <h4 className='font-semibold text-gray-900'>Requirements</h4>
                              <ul className='mt-3 space-y-2'>
                                {job.requirements.map((requirement) => (
                                  <li
                                    key={requirement}
                                    className='flex items-start gap-3 text-sm text-gray-600'
                                  >
                                    <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500' />
                                    <span>{requirement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {applicationJob && (
          <JobApplicationModal
            key={applicationJob._id}
            job={applicationJob}
            onClose={() => setApplicationJob(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
