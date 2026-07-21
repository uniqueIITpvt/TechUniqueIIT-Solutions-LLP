import { api } from '@/services/api';
import {
  Job,
  JobApplication,
  JobApplicationPagination,
  JobPayload,
} from '@/types/job';

interface JobListResponse {
  success: boolean;
  count: number;
  data: Job[];
}

interface JobResponse {
  success: boolean;
  data: Job;
}

interface ApplicationSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    createdAt: string;
  };
}

interface ApplicationListResponse {
  success: boolean;
  data: JobApplication[];
  pagination: JobApplicationPagination;
}

interface ResumeDownloadResponse {
  success: boolean;
  data: {
    url: string;
  };
}

export const jobApi = {
  getPublished: async (department?: string) => {
    const response = await api.get<JobListResponse>('/api/jobs', {
      params:
        department && department !== 'All' ? { department } : undefined,
    });
    return response.data;
  },
  apply: async (jobId: string, payload: FormData) => {
    const response = await api.post<ApplicationSubmissionResponse>(
      '/api/jobs/' + jobId + '/apply',
      payload
    );
    return response.data;
  },
};

export const jobAdminApi = {
  getAll: async () => {
    const response = await api.get<JobListResponse>('/api/jobs/admin');
    return response.data;
  },
  create: async (payload: JobPayload) => {
    const response = await api.post<JobResponse>('/api/jobs', payload);
    return response.data;
  },
  update: async (id: string, payload: Partial<JobPayload>) => {
    const response = await api.put<JobResponse>('/api/jobs/' + id, payload);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await api.delete<{ success: boolean }>('/api/jobs/' + id);
    return response.data;
  },
  getApplications: async (page = 1, limit = 20, jobId = '') => {
    const response = await api.get<ApplicationListResponse>(
      '/api/jobs/applications',
      {
        params: {
          page,
          limit,
          ...(jobId ? { jobId } : {}),
        },
      }
    );
    return response.data;
  },
  getResumeDownload: async (applicationId: string) => {
    const response = await api.get<ResumeDownloadResponse>(
      '/api/jobs/applications/' + applicationId + '/resume'
    );
    return response.data;
  },
  removeApplication: async (applicationId: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(
      '/api/jobs/applications/' + applicationId
    );
    return response.data;
  },
};