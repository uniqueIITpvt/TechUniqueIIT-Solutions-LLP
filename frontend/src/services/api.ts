import axios from 'axios';
import { toast } from 'react-hot-toast';

// Get API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const baseURL = apiUrl;

const isAdminRoute = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.location.pathname.startsWith('/dashboard');
};
 

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout (increased from 10)
  withCredentials: false,
});

// Auth API functions
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Store user info including role
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to login'
      );
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Store user info
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to register'
      );
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  // Get current authentication status
  checkAuth: async () => {
    try {
      const response = await api.get('/api/auth/me');
      // Update stored user data
      if (response.data.success && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Clear user data if auth check fails
      localStorage.removeItem('user');
      return { success: false };
    }
  }
};

// Upload API functions
export const uploadApi = {
  uploadImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
       
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to upload image'
      );
    }
  }
};

// Add Blog API functions
export const blogApi = {
  getBlogs: async (params?: { page?: number; limit?: number; category?: string }) => {
    try {
      const response = await api.get('/api/blogs', { params });
    
      return response.data;
    } catch (error: any) {
     
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to fetch blogs'
      );
    }
  },

  getBlogBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/api/blogs/slug/${slug}`);
     
      return response.data;
    } catch (error: any) {
    
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to fetch blog'
      );
    }
  },

  getFeaturedBlogs: async () => {
    try {
      // Get featured blogs based on view count
      const response = await api.get('/api/blogs', { 
        params: { 
          limit: 3,
          sort: '-viewCount',
          status: 'published'
        } 
      });
      
      return response.data;
    } catch (error: any) {
      
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to fetch featured blogs'
      );
    }
  }
};

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    // More detailed logging for all requests
    console.log(`API Request:`, { 
      url: config.url, 
      method: config.method, 
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      params: config.params
    });
    
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    config.url = `${config.url}${
      config.url?.includes('?') ? '&' : '?'
    }_t=${timestamp}`;

    // Don't modify content-type if it's form data
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    // Log responses for debugging
    console.log(`API Response from ${response.config.url}`, { 
      status: response.status,
      success: response.data?.success,
      data: response.data
    });
    return response;
  },
  async (error) => {
    // Log error for debugging
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

    const originalRequest = error.config;

    // Initialize retryCount if it doesn't exist
    if (!originalRequest.retryCount) {
      originalRequest.retryCount = 0;
    }

    // Maximum number of retries
    const maxRetries = 2;

    // Check if we should retry the request
    const shouldRetry = 
      originalRequest.retryCount < maxRetries && 
      (!error.response || error.response.status >= 500 || error.response.status === 0);

    if (shouldRetry) {
      originalRequest.retryCount += 1;
      
      // Delay retries using exponential backoff
      const delay = Math.pow(2, originalRequest.retryCount) * 1000; // 2s, 4s
      
      // Return new promise to handle retrying
      return new Promise(resolve => {
        setTimeout(() => {
        
          resolve(axios(originalRequest));
        }, delay);
      });
    }

    if (error.response) {
      // Handle authentication errors
      if (error.response.status === 401) {
        const isLoginPage =
          typeof window !== 'undefined' && window.location.pathname.includes('/login');

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('lastTokenValidation');

        if (isAdminRoute() && !isLoginPage) {
          toast.error('Admin session expired. Please log in again.', {
            id: 'session-expired',
          });

          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }, 1500);
        }
      } else if (error.response.status >= 500) {
        // Show toast for server errors
        toast.error('Server error. Please try again later.', {
          id: 'server-error',
        });
      }
    }

    return Promise.reject(error);
  }
);

// Simple method exports
export const apiMethods = {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};



