'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaPaperPlane,
  FaPhone,
  FaTrash,
  FaUser,
} from 'react-icons/fa';
import {
  ContactMessage,
  ContactPagination,
  contactAdminApi,
} from '@/services/contactService';

const EMPTY_PAGINATION: ContactPagination = {
  page: 1,
  limit: 20,
  total: 0,
  pages: 1,
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (
      error as { response?: { data?: { message?: string } } }
    ).response;
    if (response?.data?.message) return response.data.message;
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);
  const [pagination, setPagination] =
    useState<ContactPagination>(EMPTY_PAGINATION);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [reply, setReply] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await contactAdminApi.getMessages(page, 20);
      setMessages(result.data);
      setPagination(result.pagination);
      setSelectedId((currentId) => {
        if (currentId && result.data.some((item) => item._id === currentId)) {
          return currentId;
        }
        return result.data[0]?._id || null;
      });

      if (result.data.length === 0) setSelectedMessage(null);
    } catch (loadError) {
      setError(
        getErrorMessage(loadError, 'Messages could not be loaded. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const loadMessage = useCallback(async (id: string) => {
    setIsLoadingDetail(true);
    setError('');

    try {
      const result = await contactAdminApi.getMessage(id);
      setSelectedMessage(result.data);
    } catch (loadError) {
      setError(
        getErrorMessage(loadError, 'Message details could not be loaded.')
      );
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (selectedId) loadMessage(selectedId);
  }, [loadMessage, selectedId]);

  const handleReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = reply.trim();
    if (!selectedId || !message || isSending) return;

    setIsSending(true);
    setError('');

    try {
      const result = await contactAdminApi.sendReply(selectedId, message);
      setSelectedMessage(result.data);
      setMessages((current) =>
        current.map((item) =>
          item._id === result.data._id ? result.data : item
        )
      );
      setReply('');
      toast.success('Reply sent to the client email.', {
        id: 'contact-reply-sent',
      });
    } catch (sendError) {
      const messageText = getErrorMessage(
        sendError,
        'Reply could not be delivered. Please check SMTP settings and retry.'
      );
      toast.error(messageText, { id: 'contact-reply-failed' });
      await loadMessage(selectedId);
      setError(messageText);
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (message: ContactMessage) => {
    const fullName = `${message.firstName} ${message.lastName}`.trim();
    const confirmed = window.confirm(
      `Delete ${fullName || message.email}'s message permanently? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(message._id);
    setError('');

    try {
      await contactAdminApi.deleteMessage(message._id);
      toast.success('Message deleted.');

      const remainingMessages = messages.filter((item) => item._id !== message._id);
      if (selectedId === message._id) {
        const nextMessage = remainingMessages[0] || null;
        setSelectedId(nextMessage?._id || null);
        setSelectedMessage(nextMessage);
      }

      if (messages.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        setMessages(remainingMessages);
        setPagination((current) => {
          const total = Math.max(0, current.total - 1);
          return {
            ...current,
            total,
            pages: Math.max(1, Math.ceil(total / current.limit)),
          };
        });
      }
    } catch (deleteError) {
      const messageText = getErrorMessage(
        deleteError,
        'Message could not be deleted.'
      );
      toast.error(messageText);
      setError(messageText);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Client Messages</h2>
        <p className='mt-1 text-sm text-gray-500'>
          View contact queries and reply directly to the client email.
        </p>
      </div>

      {error && (
        <div className='flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          <FaExclamationCircle className='mt-0.5 flex-shrink-0' />
          <span>{error}</span>
        </div>
      )}

      <div className='grid min-h-[620px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[360px_minmax(0,1fr)]'>
        <section className='border-b border-gray-200 lg:border-b-0 lg:border-r'>
          <div className='flex items-center justify-between border-b border-gray-200 px-4 py-4'>
            <div>
              <h3 className='font-semibold text-gray-900'>Inbox</h3>
              <p className='text-xs text-gray-500'>
                {pagination.total} {pagination.total === 1 ? 'message' : 'messages'}
              </p>
            </div>
            <button
              type='button'
              onClick={loadMessages}
              disabled={isLoading}
              className='rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50'
            >
              Refresh
            </button>
          </div>

          <div className='max-h-[430px] overflow-y-auto lg:max-h-[560px]'>
            {isLoading ? (
              <div className='flex h-40 items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent' />
              </div>
            ) : messages.length === 0 ? (
              <div className='flex h-48 flex-col items-center justify-center px-6 text-center text-gray-500'>
                <FaEnvelope className='mb-3 text-3xl text-gray-300' />
                <p className='font-medium'>No client messages yet</p>
                <p className='mt-1 text-xs'>New contact queries will appear here.</p>
              </div>
            ) : (
              messages.map((item) => (
                <button
                  key={item._id}
                  type='button'
                  onClick={() => setSelectedId(item._id)}
                  className={`w-full border-b border-gray-100 px-4 py-4 text-left transition-colors last:border-b-0 ${
                    selectedId === item._id
                      ? 'bg-indigo-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className='flex items-start justify-between gap-3'>
                    <p className='truncate font-semibold text-gray-900'>
                      {item.firstName} {item.lastName}
                    </p>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                        item.status === 'replied'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className='mt-1 truncate text-xs text-gray-500'>{item.email}</p>
                  <p className='mt-2 line-clamp-2 text-sm text-gray-600'>
                    {item.message}
                  </p>
                  <p className='mt-2 text-[11px] text-gray-400'>
                    {formatDate(item.createdAt)}
                  </p>
                </button>
              ))
            )}
          </div>

          {pagination.pages > 1 && (
            <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3'>
              <button
                type='button'
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1 || isLoading}
                className='rounded border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 disabled:opacity-40'
              >
                Previous
              </button>
              <span className='text-xs text-gray-500'>
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                type='button'
                onClick={() =>
                  setPage((current) => Math.min(pagination.pages, current + 1))
                }
                disabled={page >= pagination.pages || isLoading}
                className='rounded border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 disabled:opacity-40'
              >
                Next
              </button>
            </div>
          )}
        </section>

        <section className='min-w-0'>
          {isLoadingDetail ? (
            <div className='flex h-full min-h-[400px] items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent' />
            </div>
          ) : !selectedMessage ? (
            <div className='flex h-full min-h-[400px] flex-col items-center justify-center px-6 text-center text-gray-500'>
              <FaEnvelope className='mb-4 text-5xl text-gray-200' />
              <p className='font-medium'>Select a message to view details</p>
            </div>
          ) : (
            <div className='flex h-full flex-col'>
              <div className='border-b border-gray-200 p-5 sm:p-6'>
                <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>
                      {selectedMessage.firstName} {selectedMessage.lastName}
                    </h3>
                    <p className='mt-1 text-xs text-gray-400'>
                      Received {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                  <div className='flex flex-wrap items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => handleDelete(selectedMessage)}
                      disabled={deletingId === selectedMessage._id}
                      className='inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <FaTrash />
                      {deletingId === selectedMessage._id ? 'Deleting...' : 'Delete'}
                    </button>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        selectedMessage.status === 'replied'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>

                <div className='mt-5 grid gap-3 text-sm sm:grid-cols-2'>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className='flex items-center gap-2 text-indigo-600 hover:underline'
                  >
                    <FaEnvelope className='text-gray-400' />
                    <span className='truncate'>{selectedMessage.email}</span>
                  </a>
                  <a
                    href={`tel:${selectedMessage.countryCode}${selectedMessage.phone}`}
                    className='flex items-center gap-2 text-gray-700 hover:text-indigo-600'
                  >
                    <FaPhone className='text-gray-400' />
                    {selectedMessage.countryCode} {selectedMessage.phone}
                  </a>
                </div>
              </div>

              <div className='flex-1 space-y-5 overflow-y-auto p-5 sm:p-6'>
                <div>
                  <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700'>
                    <FaUser className='text-gray-400' />
                    Client query
                  </div>
                  <div className='whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700'>
                    {selectedMessage.message}
                  </div>
                </div>

                {selectedMessage.replies.length > 0 && (
                  <div className='space-y-3'>
                    <h4 className='text-sm font-semibold text-gray-700'>Reply history</h4>
                    {selectedMessage.replies.map((item) => (
                      <div
                        key={item._id}
                        className={`rounded-lg border p-4 ${
                          item.deliveryStatus === 'failed'
                            ? 'border-red-200 bg-red-50'
                            : 'border-green-200 bg-green-50'
                        }`}
                      >
                        <div className='mb-2 flex items-center justify-between gap-3 text-xs'>
                          <span className='font-semibold text-gray-700'>Admin reply</span>
                          <span
                            className={`flex items-center gap-1 font-medium capitalize ${
                              item.deliveryStatus === 'failed'
                                ? 'text-red-600'
                                : item.deliveryStatus === 'sent'
                                  ? 'text-green-600'
                                  : 'text-amber-600'
                            }`}
                          >
                            {item.deliveryStatus === 'sent' ? (
                              <FaCheckCircle />
                            ) : item.deliveryStatus === 'failed' ? (
                              <FaExclamationCircle />
                            ) : null}
                            {item.deliveryStatus}
                          </span>
                        </div>
                        <p className='whitespace-pre-wrap text-sm leading-6 text-gray-700'>
                          {item.body}
                        </p>
                        <p className='mt-2 text-[11px] text-gray-400'>
                          {formatDate(item.sentAt || item.createdAt)}
                        </p>
                        {item.deliveryStatus === 'failed' && (
                          <p className='mt-2 text-xs text-red-600'>
                            Email delivery failed. You can retry using the reply box below.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleReply} className='border-t border-gray-200 p-5 sm:p-6'>
                <label
                  htmlFor='reply-message'
                  className='mb-2 block text-sm font-semibold text-gray-700'
                >
                  Reply to {selectedMessage.email}
                </label>
                <textarea
                  id='reply-message'
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  rows={5}
                  maxLength={10000}
                  required
                  disabled={isSending}
                  placeholder='Write your reply...'
                  className='w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-50'
                />
                <div className='mt-3 flex items-center justify-between gap-3'>
                  <span className='text-xs text-gray-400'>{reply.length}/10000</span>
                  <button
                    type='submit'
                    disabled={!reply.trim() || isSending}
                    className='inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <FaPaperPlane />
                    {isSending ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
