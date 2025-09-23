export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featuredImage: string;
  author: User | string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
  viewCount: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  success: boolean;
  data: Blog;
  message?: string;
}

export interface BlogsResponse {
  success: boolean;
  count: number;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalDocuments: number;
  };
  data: Blog[];
  message?: string;
} 