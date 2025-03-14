'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  FaBlog,
  FaChartLine,
  FaUsers,
  FaSignOutAlt,
  FaUser,
  FaBook,
} from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { MdDashboard, MdCreate } from 'react-icons/md';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard size={20} />,
  },
  {
    title: 'Create Post',
    path: '/dashboard/post-blog',
    icon: <MdCreate size={20} />,
  },
  {
    title: 'My Blogs',
    path: '/dashboard/my-blogs',
    icon: <FaBlog size={20} />,
  },
  {
    title: 'Case Studies',
    path: '/dashboard/case-studies',
    icon: <FaBook size={20} />,
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    icon: <FaChartLine size={20} />,
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: <FaUsers size={20} />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, validateToken } = useAuth();
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  // Validate token on mount
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const checkToken = async () => {
      if (!isMounted) return;

      // Prevent excessive validation attempts
      if (retryCount >= maxRetries) {
        setIsValidatingToken(false);
        toast.error(
          'Authentication failed after multiple attempts. Please log in again.',
          {
            id: 'auth-retry-exceeded',
          }
        );
        logout();
        return;
      }

      retryCount++;
      setIsValidatingToken(true);

      try {
        const isValid = await validateToken();
        if (!isMounted) return;

        if (!isValid) {
          toast.error('Your session has expired. Please log in again.', {
            id: 'session-expired-dashboard',
          });
          logout();
        } else {
          // Successfully validated, no need to retry
          retryCount = maxRetries;
        }
      } catch (error) {
        if (!isMounted) return;

        toast.error('Authentication error. Please log in again.', {
          id: 'auth-error-dashboard',
        });
        logout();
      } finally {
        if (isMounted) {
          setIsValidatingToken(false);
        }
      }
    };

    checkToken();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [validateToken, logout]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (
        isMobile &&
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  const handleLogout = () => {
    toast.success('You have been logged out successfully', {
      id: 'logout-success',
    });
    logout();
  };

  if (isValidatingToken) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Validating your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id='sidebar'
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='h-full px-4 py-6 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 w-72'>
          {/* Logo/Brand */}
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center'>
              <FaBlog size={40} className='text-white' />
              <h2 className='ml-3 text-xl font-bold text-white'>
                TechUniqueIIT
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='md:hidden text-gray-400 hover:text-white transition-colors'
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className='space-y-1'>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 text-gray-300 rounded-lg transition-all duration-200
                  ${
                    pathname === item.path
                      ? 'bg-gray-700 text-white shadow-lg'
                      : 'hover:bg-gray-700 hover:text-white'
                  }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className='inline-flex items-center justify-center w-8'>
                  {item.icon}
                </span>
                <span className='ml-3'>{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <div className='flex items-center px-4 py-3 bg-gray-700 rounded-lg'>
              <div className='flex-shrink-0'>
                <FaUser className='text-white' size={32} />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium text-white'>
                  {user?.name || 'Loading...'}
                </p>
                <p className='text-xs text-gray-400'>
                  {user?.email || 'Loading...'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className='ml-auto text-gray-400 hover:text-white transition-colors'
              >
                <FaSignOutAlt size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className='md:ml-72 transition-all duration-300'>
        {/* Header */}
        <header className='sticky top-0 z-20 bg-white shadow-sm'>
          <div className='flex items-center justify-between px-4 py-4 md:px-6'>
            <div className='flex items-center'>
              <button
                onClick={() => setIsOpen(true)}
                className='md:hidden text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                <HiMenuAlt3 size={24} />
              </button>
              <div className='ml-4 md:ml-0'>
                <h1 className='text-lg font-semibold text-gray-800'>
                  {menuItems.find((item) => item.path === pathname)?.title ||
                    'Dashboard'}
                </h1>
                <p className='text-sm text-gray-500'>
                  Welcome back, {user?.name || 'User'}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className='flex items-center space-x-4'>
              <Link
                href='/dashboard/post-blog'
                className='hidden md:flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'
              >
                <MdCreate className='mr-2' size={18} />
                New Post
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='p-4 md:p-6 max-w-7xl mx-auto'>{children}</main>
      </div>
    </div>
  );
}
