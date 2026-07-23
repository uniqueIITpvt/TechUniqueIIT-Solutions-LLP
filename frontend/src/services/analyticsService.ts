import { api } from '@/services/api';

export type AnalyticsOverview = {
  totalViews: number;
  viewsChange: number | null;
  totalBlogs: number;
  blogsChange: number | null;
  totalMessages: number;
  messagesChange: number | null;
  totalApplications: number;
  applicationsChange: number | null;
  totalJobs: number;
  openJobs: number;
  closedJobs: number;
};

export type AnalyticsTopPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  views: number;
  readTime: number;
  createdAt: string;
};

export type AnalyticsTrendPoint = {
  key: string;
  label: string;
  blogs: number;
  messages: number;
  applications: number;
  views: number;
  totalActivity: number;
};

export type AnalyticsStatusItem = {
  label: string;
  count: number;
  percentage: number;
};

export type AnalyticsDepartmentItem = {
  department: string;
  applications: number;
  percentage: number;
};

export type AnalyticsActivity = {
  id: string;
  type: 'blog' | 'message' | 'application';
  title: string;
  subtitle: string;
  createdAt: string;
};

export type AnalyticsData = {
  generatedAt: string;
  period: string;
  periodLabel: string;
  overview: AnalyticsOverview;
  topPosts: AnalyticsTopPost[];
  trend: AnalyticsTrendPoint[];
  blogStatus: AnalyticsStatusItem[];
  messageStatus: AnalyticsStatusItem[];
  applicationsByDepartment: AnalyticsDepartmentItem[];
  recentActivity: AnalyticsActivity[];
};

export const analyticsAdminApi = {
  getAnalytics: async (period = '30days') => {
    const response = await api.get<{ success: boolean; data: AnalyticsData }>(
      '/api/analytics',
      { params: { period } }
    );
    return response.data;
  },
};