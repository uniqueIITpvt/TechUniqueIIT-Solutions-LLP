'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/services/api';
import { toast } from 'react-hot-toast';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(email, password);
          if (response.success && response.token) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            throw new Error('Login failed');
          }
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(name, email, password);
          if (response.success && response.token) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            throw new Error('Registration failed');
          }
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },
      logout: () => {
        authApi.logout();
        set({ user: null, isAuthenticated: false });
        toast.success('You have been logged out successfully');
      },
      clearError: () => set({ error: null }),
      checkAuth: async () => {
        try {
          const response = await authApi.checkAuth();
          if (response.success && response.user) {
            set({ user: response.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          return JSON.parse(localStorage.getItem(name) || 'null');
        },
        setItem: (name, value) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
);
