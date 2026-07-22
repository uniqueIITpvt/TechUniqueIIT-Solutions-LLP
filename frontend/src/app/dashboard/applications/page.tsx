'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaBriefcase,
  FaDownload,
  FaEnvelope,
  FaFileAlt,
  FaPhone,
  FaSyncAlt,
  FaTrash,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa';
import { jobAdminApi } from '@/services/jobService';
import {
  Job,
  JobApplication,
  JobApplicationPagination,
} from '@/types/job';

const EMPTY_PAGINATION: JobApplicationPagination = {
  page: 1,
  limit: 20,
  total: 0,
  pages: 1,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (
      error as { response?: { data?: { message?: string | string[] } } }
    ).response;
    const message = response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }

  return error instanceof Error && error.message ? error.message : fallback;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] =
    useState<JobApplicationPagination>(EMPTY_PAGINATION);
  const [page, setPage] = useState(1);
  const [jobId, setJobId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingJobs, setIsRefreshingJobs] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadJobs = useCallback(async () => {
    setIsRefreshingJobs(true);
    try {
      const result = await jobAdminApi.getAll();
      setJobs(result.data);
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Job filters could not be loaded.'));
    } finally {
      setIsRefreshingJobs(false);
    }
  }, []);

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await jobAdminApi.getApplications(page, 20, jobId);
      setApplications(result.data);
      setPagination(result.pagination);
    } catch (loadError) {
      setError(
        getErrorMessage(loadError, 'Applications could not be loaded.')
      );
    } finally {
      setIsLoading(false);
    }
  }, [jobId, page]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleJobFilter = (value: string) => {
    setJobId(value);
    setPage(1);
  };

  const handleDownload = async (application: JobApplication) => {
    if (downloadingId) return;

    const downloadWindow = window.open('about:blank', '_blank');
    if (downloadWindow) {
      downloadWindow.opener = null;
      downloadWindow.document.title = 'Preparing resume...';
      downloadWindow.document.body.textContent = 'Preparing resume download...';
    }

    setDownloadingId(application._id);

    try {
      const result = await jobAdminApi.getResumeDownload(application._id);
      if (downloadWindow) {
        downloadWindow.location.replace(result.data.url);
      } else {
        window.location.assign(result.data.url);
      }
    } catch (downloadError) {
      downloadWindow?.close();
      toast.error(
        getErrorMessage(downloadError, 'Resume could not be downloaded.')
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (application: JobApplication) => {
    const confirmed = window.confirm(
      'Delete ' +
        application.name +
        "'s application and resume permanently? This cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(application._id);

    try {
      await jobAdminApi.removeApplication(application._id);
      toast.success('Application and resume deleted.');

      if (applications.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await loadApplications();
      }
    } catch (deleteError) {
      toast.error(
        getErrorMessage(deleteError, 'Application could not be deleted.')
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Job Applications</h2>
          <p className='mt-1 text-sm text-gray-500'>
            Review candidates and manage their submitted resumes.
          </p>
        </div>

        <div className='flex flex-col gap-2 sm:flex-row sm:items-end'>
          <label className='min-w-56'>
            <span className='mb-1.5 block text-xs font-semibold uppercase text-gray-500'>
              Filter by job
            </span>
            <select
              value={jobId}
              onChange={(event) => handleJobFilter(event.target.value)}
              disabled={isRefreshingJobs}
              className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500'
            >
              <option value=''>All jobs</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </label>

          <button
            type='button'
            onClick={loadApplications}
            disabled={isLoading}
            title='Refresh applications'
            className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50'
          >
            <FaSyncAlt className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div
          role='alert'
          className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
        >
          {error}
        </div>
      )}

      <section className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4'>
          <div>
            <h3 className='font-semibold text-gray-900'>Candidates</h3>
            <p className='text-xs text-gray-500'>
              {pagination.total} {pagination.total === 1 ? 'application' : 'applications'}
            </p>
          </div>
          <FaUsers className='text-xl text-indigo-500' />
        </div>

        {isLoading ? (
          <div className='flex h-56 items-center justify-center'>
            <div className='h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent' />
          </div>
        ) : applications.length === 0 ? (
          <div className='flex h-64 flex-col items-center justify-center px-6 text-center'>
            <FaFileAlt className='mb-4 text-5xl text-gray-200' />
            <p className='font-semibold text-gray-700'>No applications found</p>
            <p className='mt-1 text-sm text-gray-500'>
              New candidate applications will appear here.
            </p>
          </div>
        ) : (
          <div className='divide-y divide-gray-100'>
            {applications.map((application) => (
              <article key={application._id} className='p-5 sm:p-6'>
                <div className='flex flex-col justify-between gap-5 xl:flex-row xl:items-start'>
                  <div className='min-w-0 flex-1'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h4 className='text-lg font-bold text-gray-900'>
                        {application.name}
                      </h4>
                      <span className='rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700'>
                        {application.jobDepartment}
                      </span>
                    </div>

                    <div className='mt-3 grid gap-2 text-sm text-gray-600 md:grid-cols-2'>
                      <span className='flex min-w-0 items-center gap-2'>
                        <FaEnvelope className='flex-shrink-0 text-gray-400' />
                        <a
                          href={'mailto:' + application.email}
                          className='truncate hover:text-indigo-600'
                        >
                          {application.email}
                        </a>
                      </span>
                      <span className='flex min-w-0 items-center gap-2'>
                        <FaPhone className='flex-shrink-0 text-gray-400' />
                        {application.phone ? (
                          <a
                            href={'tel:' + application.phone}
                            className='truncate hover:text-indigo-600'
                          >
                            {application.phone}
                          </a>
                        ) : (
                          <span className='text-gray-400'>Not provided</span>
                        )}
                      </span>
                      <span className='flex min-w-0 items-center gap-2'>
                        <FaBriefcase className='flex-shrink-0 text-gray-400' />
                        <span className='truncate'>{application.jobTitle}</span>
                      </span>
                      <span className='flex min-w-0 items-center gap-2'>
                        <FaUserGraduate className='flex-shrink-0 text-gray-400' />
                        <span className='break-words'>{application.qualification}</span>
                      </span>
                    </div>

                    <p className='mt-3 text-xs text-gray-400'>
                      Applied {formatDate(application.createdAt)}
                    </p>
                  </div>

                  <div className='flex flex-wrap items-center gap-2 xl:justify-end'>
                    <button
                      type='button'
                      onClick={() => handleDownload(application)}
                      disabled={downloadingId === application._id}
                      className='inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-50'
                    >
                      <FaDownload />
                      {downloadingId === application._id
                        ? 'Preparing...'
                        : 'Resume'}
                    </button>
                    <span className='max-w-48 truncate text-xs text-gray-400'>
                      {application.resumeOriginalName} ·{' '}
                      {formatFileSize(application.resumeSize)}
                    </span>
                    <button
                      type='button'
                      onClick={() => handleDelete(application)}
                      disabled={deletingId === application._id}
                      className='inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50'
                    >
                      <FaTrash />
                      {deletingId === application._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {pagination.pages > 1 && (
          <div className='flex items-center justify-between border-t border-gray-200 px-5 py-4'>
            <button
              type='button'
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1 || isLoading}
              className='rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 disabled:opacity-40'
            >
              Previous
            </button>
            <span className='text-sm text-gray-500'>
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              type='button'
              onClick={() =>
                setPage((current) => Math.min(pagination.pages, current + 1))
              }
              disabled={page >= pagination.pages || isLoading}
              className='rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 disabled:opacity-40'
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}