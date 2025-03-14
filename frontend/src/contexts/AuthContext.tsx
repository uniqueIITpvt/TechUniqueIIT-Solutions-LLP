'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { api } from '@/services/api';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  validateToken: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(isMounted);
    } else {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchUserData = async (isMounted = true) => {
    try {
      if (isMounted) {
        setLoading(true);
      }

      const response = await api.get('/api/users/me');

      if (!isMounted) return;

      if (response.data && response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      if (!isMounted) return;

      // If token is invalid, logout
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      toast.error('Your session has expired. Please log in again.', {
        id: 'session-expired-auth',
      });
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const validateToken = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      // Add a timestamp check to prevent excessive validation
      const lastValidated = localStorage.getItem('lastTokenValidation');
      const now = Date.now();

      if (lastValidated) {
        const lastValidationTime = parseInt(lastValidated, 10);
        // Only validate if it's been more than 5 minutes since last validation
        if (now - lastValidationTime < 5 * 60 * 1000) {
          return true;
        }
      }

      // Try to validate the token by making a request to the server
      const response = await api.get('/api/users/me');

      // Update user data if validation is successful
      if (response.status === 200 && response.data && response.data.data) {
        setUser(response.data.data);
        // Store the validation timestamp
        localStorage.setItem('lastTokenValidation', now.toString());
        return true;
      }

      return false;
    } catch (error) {
      // Clear the validation timestamp on error
      localStorage.removeItem('lastTokenValidation');
      return false;
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    toast.success('Logged in successfully!', {
      id: 'login-success',
    });
    fetchUserData();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);

    // Use replace instead of push to prevent back navigation to protected pages
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading, validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
