import axios from 'axios';
import type { AuthResponse, LoginCredentials } from '@/types/auth';
import { toast } from 'react-hot-toast';

// Get API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// Use the API URL from environment variable even in development mode
const isLocalDevelopment = process.env.NODE_ENV === 'development';
const baseURL = apiUrl; // Use the configured API URL regardless of environment

// Check if the backend server is running
if (isLocalDevelopment) {
  fetch(baseURL + '/api/health-check', { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        console.warn(
          '⚠️ Backend server returned an error. Status:',
          response.status
        );
      }
    })
    .catch((error) => {
      console.error('❌ Cannot connect to backend server at', baseURL);
      console.error('Error details:', error.message);
    });
} else {
  // In production, also check if the backend is reachable
  fetch(baseURL + '/api/health-check', { method: 'GET' }).catch((error) => {
    console.error('❌ Cannot connect to production backend server at', baseURL);
    console.error('Error details:', error.message);
  });
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: false,
});

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        '/api/auth/login',
        credentials
      );
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.message || 'Failed to login'
      );
    }
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

// Add request interceptor with retry logic
api.interceptors.request.use(
  async (config) => {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    config.url = `${config.url}${
      config.url?.includes('?') ? '&' : '?'
    }_t=${timestamp}`;

    // Don't modify content-type if it's form data
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Check if this is a protected endpoint that requires authentication
      if (config.url?.includes('/my-') || config.url?.includes('/admin/')) {
        // Remove console.warn
        // console.warn(
        //   'Attempting to access a protected endpoint without authentication token'
        // );
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Initialize retryCount if it doesn't exist
    if (!originalRequest.retryCount) {
      originalRequest.retryCount = 0;
    }

    if (error.response) {
      // Handle authentication errors
      if (error.response.status === 401) {
        // Prevent redirect loops
        const isLoginPage =
          typeof window !== 'undefined' &&
          window.location.pathname.includes('/login');
        const isDashboardPage =
          typeof window !== 'undefined' &&
          window.location.pathname.includes('/dashboard');

        // Special handling for case-studies authentication errors
        if (
          originalRequest?.url?.includes('/api/case-studies/my-case-studies')
        ) {
          // If we're trying to access my-case-studies without authentication,
          // redirect to the public case studies page instead of showing an error
          if (
            typeof window !== 'undefined' &&
            window.location.pathname.includes('/case-studies')
          ) {
            window.location.href = '/case-studies';
            return Promise.reject(error);
          }
        }

        // Don't show error or redirect if we're already on login page
        if (isLoginPage) {
          return Promise.reject(error);
        }

        // For dashboard pages, only show the error once
        if (isDashboardPage) {
          const lastAuthError = localStorage.getItem('lastAuthError');
          const now = Date.now();

          if (!lastAuthError || now - parseInt(lastAuthError, 10) > 10000) {
            // 10 seconds
            localStorage.setItem('lastAuthError', now.toString());
            toast.error('Your session has expired. Please log in again.', {
              id: 'session-expired',
            });
          }

          // Don't automatically redirect from dashboard pages
          // Let the component handle it
          return Promise.reject(error);
        }

        // For other pages, redirect to login
        toast.error('Your session has expired. Please log in again.', {
          id: 'session-expired',
        });
        localStorage.removeItem('token');
        localStorage.removeItem('lastTokenValidation');

        // Use a timeout to prevent immediate redirect
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);

        return Promise.reject(error);
      } else if (error.response.status === 403) {
        // Show toast for permission errors
        if (!window.location.pathname.includes('/login')) {
          // Use a unique ID for this toast to prevent duplicates
          toast.error('You do not have permission to access this resource', {
            id: 'permission-error',
          });
        }
      } else if (error.response.status >= 500) {
        // Show toast for server errors with a unique ID
        toast.error('Server error. Please try again later.', {
          id: 'server-error',
        });
      }
    }

    // If error is network error and hasn't been retried too many times
    if (
      (error.message === 'Network Error' ||
        error.code === 'ERR_NETWORK' ||
        error.message === 'timeout of 10000ms exceeded' ||
        (error.response && error.response.status >= 500)) &&
      originalRequest.retryCount < 3
    ) {
      originalRequest.retryCount += 1;

      // Wait before retrying (exponential backoff)
      const backoffTime = Math.pow(2, originalRequest.retryCount) * 1000;
      await new Promise((resolve) => setTimeout(resolve, backoffTime));

      // Show toast for retry with a unique ID
      if (originalRequest.retryCount === 1) {
        toast.loading('Connection issue. Retrying...', {
          id: 'connection-retry',
        });
      }

      return api(originalRequest);
    }

    // Show toast for network errors with a unique ID
    if (error.message === 'Network Error') {
      toast.error('Network error. Please check your internet connection.', {
        id: 'network-error',
      });
    }

    return Promise.reject(error);
  }
);

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const apiMethods = {
  // Axios methods
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,

  // Custom auth methods
  login: async (data: LoginData) => {
    try {
      const response = await api.post('/api/auth/login', data);
      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
};
