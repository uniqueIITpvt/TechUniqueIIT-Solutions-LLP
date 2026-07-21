'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaFileUpload,
  FaPaperPlane,
  FaTimes,
} from 'react-icons/fa';
import { jobApi } from '@/services/jobService';
import { Job } from '@/types/job';

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];

const getErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (
      error as { response?: { data?: { message?: string | string[] } } }
    ).response;
    const message = response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }

  return 'Application could not be submitted. Please try again.';
};

interface JobApplicationModalProps {
  job: Job;
  onClose: () => void;
}

export const JobApplicationModal = ({
  job,
  onClose,
}: JobApplicationModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nameInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitting, onClose]);

  const handleResumeChange = (file: File | null) => {
    setFileError('');
    setResume(null);

    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setFileError('Please upload a PDF, DOC, or DOCX resume.');
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      setFileError('Resume size must be 5 MB or less.');
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!resume) {
      setFileError('Please select your resume.');
      return;
    }

    const form = event.currentTarget;
    const values = new FormData(form);
    values.set('resume', resume);

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await jobApi.apply(job._id, values);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className='fixed inset-0 z-[70] flex items-end justify-center bg-gray-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6'
      role='presentation'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <motion.div
        role='dialog'
        aria-modal='true'
        aria-labelledby='application-dialog-title'
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className='max-h-[92vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-xl'
      >
        <div className='sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-200 bg-white px-5 py-4 sm:px-6'>
          <div className='min-w-0'>
            <p className='text-xs font-semibold uppercase text-indigo-600'>
              Job application
            </p>
            <h3
              id='application-dialog-title'
              className='mt-1 truncate text-xl font-bold text-gray-900'
            >
              {job.title}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              {job.department} · {job.location}
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            disabled={isSubmitting}
            aria-label='Close application form'
            title='Close'
            className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50'
          >
            <FaTimes />
          </button>
        </div>

        {isSubmitted ? (
          <div className='px-6 py-14 text-center sm:px-10'>
            <FaCheckCircle className='mx-auto text-5xl text-green-500' />
            <h4 className='mt-5 text-xl font-bold text-gray-900'>
              Application submitted
            </h4>
            <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600'>
              Your application for {job.title} has been received.
            </p>
            <button
              type='button'
              onClick={onClose}
              className='mt-7 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700'
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-5 px-5 py-6 sm:px-6'>
            {submitError && (
              <div
                role='alert'
                className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
              >
                {submitError}
              </div>
            )}

            <div className='grid gap-5 sm:grid-cols-2'>
              <label className='sm:col-span-2'>
                <span className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Full name *
                </span>
                <input
                  ref={nameInputRef}
                  name='name'
                  type='text'
                  required
                  maxLength={120}
                  autoComplete='name'
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                />
              </label>

              <label>
                <span className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Email *
                </span>
                <input
                  name='email'
                  type='email'
                  required
                  maxLength={254}
                  autoComplete='email'
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                />
              </label>

              <label>
                <span className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Phone
                </span>
                <input
                  name='phone'
                  type='tel'
                  maxLength={30}
                  autoComplete='tel'
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                />
              </label>

              <label className='sm:col-span-2'>
                <span className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Qualification *
                </span>
                <textarea
                  name='qualification'
                  required
                  maxLength={500}
                  rows={3}
                  placeholder='Degree, certification, skills, or relevant experience'
                  className='w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                />
              </label>

              <label className='sm:col-span-2'>
                <span className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Resume *
                </span>
                <span className='flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40'>
                  <FaFileUpload className='text-2xl text-indigo-500' />
                  <span className='mt-2 max-w-full truncate text-sm font-medium text-gray-700'>
                    {resume ? resume.name : 'Choose resume'}
                  </span>
                  <span className='mt-1 text-xs text-gray-500'>
                    PDF, DOC, or DOCX · Maximum 5 MB
                  </span>
                  <input
                    name='resume'
                    type='file'
                    required
                    accept='.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    onChange={(event) =>
                      handleResumeChange(event.target.files?.[0] || null)
                    }
                    className='sr-only'
                  />
                </span>
                {fileError && (
                  <span className='mt-1.5 block text-sm text-red-600'>
                    {fileError}
                  </span>
                )}
              </label>
            </div>

            <div className='flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row'>
              <button
                type='button'
                onClick={onClose}
                disabled={isSubmitting}
                className='rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <FaPaperPlane />
                {isSubmitting ? 'Submitting...' : 'Submit application'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};