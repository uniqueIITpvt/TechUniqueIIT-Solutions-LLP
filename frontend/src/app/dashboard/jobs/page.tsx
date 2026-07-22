'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaBriefcase,
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { jobAdminApi } from '@/services/jobService';
import {
  EmploymentType,
  Job,
  JobPayload,
  JobStatus,
  WorkplaceType,
} from '@/types/job';

type JobForm = Omit<JobPayload, 'requirements' | 'expiresAt'> & {
  requirements: string;
  expiresAt: string;
};

const EMPTY_FORM: JobForm = {
  title: '',
  department: 'Engineering',
  location: '',
  workplaceType: 'Remote',
  employmentType: 'Full-time',
  salary: '',
  summary: '',
  description: '',
  requirements: '',
  applyEmail: '',
  applyUrl: '',
  status: 'draft',
  expiresAt: '',
};

const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
  'Other',
];
const workplaceTypes: WorkplaceType[] = ['Remote', 'Hybrid', 'On-site'];
const employmentTypes: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
];
const statuses: JobStatus[] = ['draft', 'published', 'closed'];

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
  new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(
    new Date(value)
  );

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<JobForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadJobs = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await jobAdminApi.getAll();
      setJobs(result.data);
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Jobs could not be loaded.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const updateField = <K extends keyof JobForm>(key: K, value: JobForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const startCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (job: Job) => {
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      workplaceType: job.workplaceType,
      employmentType: job.employmentType,
      salary: job.salary,
      summary: job.summary,
      description: job.description,
      requirements: job.requirements.join('\n'),
      applyEmail: job.applyEmail,
      applyUrl: job.applyUrl,
      status: job.status,
      expiresAt: job.expiresAt ? job.expiresAt.slice(0, 10) : '',
    });
    setEditingId(job._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setError('');

    const payload: JobPayload = {
      ...form,
      requirements: form.requirements
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean),
      expiresAt: form.expiresAt || null,
    };

    try {
      if (editingId) {
        await jobAdminApi.update(editingId, payload);
        toast.success('Job updated successfully.');
      } else {
        await jobAdminApi.create(payload);
        toast.success('Job created successfully.');
      }

      resetForm();
      await loadJobs();
    } catch (saveError) {
      const message = getErrorMessage(saveError, 'Job could not be saved.');
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (job: Job, status: JobStatus) => {
    try {
      const result = await jobAdminApi.update(job._id, { status });
      setJobs((current) =>
        current.map((item) => (item._id === job._id ? result.data : item))
      );
      toast.success(`Job marked as ${status}.`);
    } catch (statusError) {
      toast.error(getErrorMessage(statusError, 'Status could not be updated.'));
    }
  };

  const handleDelete = async (job: Job) => {
    if (!window.confirm(`Delete “${job.title}”? This cannot be undone.`)) return;

    setDeletingId(job._id);
    try {
      await jobAdminApi.remove(job._id);
      setJobs((current) => current.filter((item) => item._id !== job._id));
      toast.success('Job deleted.');
    } catch (deleteError) {
      toast.error(getErrorMessage(deleteError, 'Job could not be deleted.'));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Job Posts</h2>
          <p className='mt-1 text-sm text-gray-500'>
            Manage the open positions shown on the careers page.
          </p>
        </div>
        <button
          type='button'
          onClick={showForm ? resetForm : startCreate}
          className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700'
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Close Form' : 'Post a Job'}
        </button>
      </div>

      {error && (
        <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6'
        >
          <div className='mb-6 flex items-center gap-3'>
            <div className='rounded-lg bg-indigo-100 p-3 text-indigo-600'>
              <FaBriefcase />
            </div>
            <div>
              <h3 className='font-bold text-gray-900'>
                {editingId ? 'Edit Job' : 'Create Job'}
              </h3>
              <p className='text-xs text-gray-500'>Fields marked * are required.</p>
            </div>
          </div>

          <div className='grid gap-5 md:grid-cols-2'>
            <label className='md:col-span-2'>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>
                Job title *
              </span>
              <input
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                maxLength={160}
                required
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              />
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Department *</span>
              <input
                value={form.department}
                onChange={(event) => updateField('department', event.target.value)}
                list='job-departments'
                required
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              />
              <datalist id='job-departments'>
                {departments.map((item) => <option key={item} value={item} />)}
              </datalist>
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Location *</span>
              <input
                value={form.location}
                onChange={(event) => updateField('location', event.target.value)}
                placeholder='Delhi, India or Worldwide'
                required
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              />
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Workplace</span>
              <select
                value={form.workplaceType}
                onChange={(event) => updateField('workplaceType', event.target.value as WorkplaceType)}
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              >
                {workplaceTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Employment type</span>
              <select
                value={form.employmentType}
                onChange={(event) => updateField('employmentType', event.target.value as EmploymentType)}
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              >
                {employmentTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Salary / compensation</span>
              <input
                value={form.salary}
                onChange={(event) => updateField('salary', event.target.value)}
                placeholder='₹8L – ₹12L or Competitive'
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              />
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Status</span>
              <select
                value={form.status}
                onChange={(event) => updateField('status', event.target.value as JobStatus)}
                className='w-full rounded-lg border border-gray-200 px-4 py-3 capitalize outline-none focus:border-indigo-500'
              >
                {statuses.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label className='md:col-span-2'>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Short summary *</span>
              <textarea
                value={form.summary}
                onChange={(event) => updateField('summary', event.target.value)}
                rows={2}
                maxLength={500}
                required
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              />
            </label>

            <label className='md:col-span-2'>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Full description *</span>
              <textarea
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                rows={6}
                maxLength={10000}
                required
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              />
            </label>

            <label className='md:col-span-2'>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Requirements</span>
              <textarea
                value={form.requirements}
                onChange={(event) => updateField('requirements', event.target.value)}
                rows={5}
                placeholder={'Add one requirement per line'}
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              />
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Application email</span>
              <input
                type='email'
                value={form.applyEmail}
                onChange={(event) => updateField('applyEmail', event.target.value)}
                placeholder='careers@company.com'
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              />
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Application URL</span>
              <input
                type='url'
                value={form.applyUrl}
                onChange={(event) => updateField('applyUrl', event.target.value)}
                placeholder='https://...'
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              />
            </label>

            <label>
              <span className='mb-1.5 block text-sm font-medium text-gray-700'>Expiry date</span>
              <input
                type='date'
                value={form.expiresAt}
                onChange={(event) => updateField('expiresAt', event.target.value)}
                className='w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500'
              />
            </label>
          </div>

          <div className='mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row'>
            <button
              type='button'
              onClick={resetForm}
              className='rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSaving}
              className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50'
            >
              <FaSave /> {isSaving ? 'Saving...' : editingId ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      )}

      <section className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
          <div>
            <h3 className='font-semibold text-gray-900'>All jobs</h3>
            <p className='text-xs text-gray-500'>{jobs.length} total posts</p>
          </div>
          <button
            type='button'
            onClick={loadJobs}
            disabled={isLoading}
            className='rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50'
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className='flex h-48 items-center justify-center'>
            <div className='h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent' />
          </div>
        ) : jobs.length === 0 ? (
          <div className='flex h-56 flex-col items-center justify-center px-6 text-center'>
            <FaBriefcase className='mb-3 text-4xl text-gray-200' />
            <p className='font-semibold text-gray-700'>No jobs posted yet</p>
            <p className='mt-1 text-sm text-gray-500'>Create your first job post to show it on Careers.</p>
          </div>
        ) : (
          <div className='divide-y divide-gray-100'>
            {jobs.map((job) => (
              <article key={job._id} className='p-5 sm:p-6'>
                <div className='flex flex-col justify-between gap-5 lg:flex-row lg:items-start'>
                  <div className='min-w-0 flex-1'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h4 className='text-lg font-bold text-gray-900'>{job.title}</h4>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        job.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'closed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>
                      {job.department} · {job.workplaceType} · {job.employmentType} · {job.location}
                    </p>
                    <p className='mt-3 line-clamp-2 text-sm text-gray-600'>{job.summary}</p>
                    <p className='mt-3 text-xs text-gray-400'>Posted {formatDate(job.createdAt)}</p>
                  </div>

                  <div className='flex flex-wrap items-center gap-2'>
                    <select
                      aria-label={`Status for ${job.title}`}
                      value={job.status}
                      onChange={(event) => handleStatusChange(job, event.target.value as JobStatus)}
                      className='rounded-lg border border-gray-200 px-3 py-2 text-sm capitalize outline-none focus:border-indigo-500'
                    >
                      {statuses.map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <button
                      type='button'
                      onClick={() => startEdit(job)}
                      className='inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50'
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDelete(job)}
                      disabled={deletingId === job._id}
                      className='inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50'
                    >
                      <FaTrash /> {deletingId === job._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
