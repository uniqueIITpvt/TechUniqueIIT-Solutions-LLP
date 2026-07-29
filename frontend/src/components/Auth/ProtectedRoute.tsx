'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const dashboardRoles = ['admin', 'super_admin'];

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, checkAuth, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error('Please login to access this page', {
        id: 'auth-required',
      });
      router.push('/login');
      return;
    }

    if (user && !dashboardRoles.includes(user.role)) {
      toast.error('Your account does not have dashboard access', {
        id: 'dashboard-role-required',
      });
      logout();
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, logout, router, user]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !dashboardRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
