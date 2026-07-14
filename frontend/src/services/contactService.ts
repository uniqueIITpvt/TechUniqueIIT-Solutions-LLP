import { api } from '@/services/api';

export type ContactQueryResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    status: 'new' | 'replied';
    createdAt: string;
  };
};

export type ContactReply = {
  _id: string;
  body: string;
  sentBy: { _id: string; name: string; email: string } | string;
  deliveryStatus: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  emailMessageId?: string;
  deliveryError?: string;
  createdAt: string;
};

export type ContactMessage = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
  status: 'new' | 'replied';
  replies: ContactReply[];
  createdAt: string;
  updatedAt: string;
};

export type ContactPagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export const submitContactQuery = async (
  form: HTMLFormElement
): Promise<ContactQueryResponse> => {
  const formData = new FormData(form);
  const payload = {
    firstName: String(formData.get('firstName') || '').trim(),
    lastName: String(formData.get('lastName') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    countryCode: String(formData.get('countryCode') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    message: String(formData.get('message') || '').trim(),
  };

  if (!payload.firstName || !payload.email || !payload.phone || !payload.message) {
    throw new Error('First name, email, phone, and message are required');
  }

  const response = await api.post<ContactQueryResponse>('/api/contact', payload);
  return response.data;
};

export const contactAdminApi = {
  getMessages: async (page = 1, limit = 20) => {
    const response = await api.get<{
      success: boolean;
      data: ContactMessage[];
      pagination: ContactPagination;
    }>('/api/contact', { params: { page, limit } });
    return response.data;
  },

  getMessage: async (id: string) => {
    const response = await api.get<{
      success: boolean;
      data: ContactMessage;
    }>(`/api/contact/${id}`);
    return response.data;
  },

  sendReply: async (id: string, message: string) => {
    const response = await api.post<{
      success: boolean;
      message: string;
      data: ContactMessage;
    }>(`/api/contact/${id}/reply`, { message });
    return response.data;
  },
};
