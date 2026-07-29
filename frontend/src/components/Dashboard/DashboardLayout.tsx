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
  FaEnvelope,
  FaBriefcase,
  FaUserShield,
} from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { MdDashboard, MdCreate } from 'react-icons/md';
import { useAuth } from '@/contexts/AuthContext';

type MenuItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  roles?: string[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard size={20} />,
  },
  {
    title: 'Create Post',
    path: '/dashboard/blogs/create',
    icon: <MdCreate size={20} />,
    roles: ['admin', 'super_admin'],
  },
  {
    title: 'Blogs',
    path: '/dashboard/my-blogs',
    icon: <FaBlog size={20} />,
  },
  {
    title: 'Jobs',
    path: '/dashboard/jobs',
    icon: <FaBriefcase size={20} />,
    roles: ['admin', 'super_admin'],
  },
  {
    title: 'Applications',
    path: '/dashboard/applications',
    icon: <FaUsers size={20} />,
    roles: ['admin', 'super_admin'],
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    icon: <FaChartLine size={20} />,
    roles: ['admin', 'super_admin'],
  },
  {
    title: 'Messages',
    path: '/dashboard/messages',
    icon: <FaEnvelope size={20} />,
    roles: ['admin', 'super_admin'],
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: <FaUserShield size={20} />,
    roles: ['super_admin'],
  },
];

const canSeeItem = (role: string | undefined, item: MenuItem) => {
  return !item.roles || Boolean(role && item.roles.includes(role));
};

const formatRole = (role?: string) => {
  if (role === 'super_admin') return 'Super Admin';
  if (role === 'admin') return 'Admin';
  return 'User';
};

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
  const visibleMenuItems = menuItems.filter((item) => canSeeItem(user?.role, item));
  const canCreatePosts = user?.role === 'admin' || user?.role === 'super_admin';

  useEffect(() => {
    let isMounted = true;

    const checkToken = async () => {
      if (!isMounted) return;

      setIsValidatingToken(true);

      try {
        const isValid = await validateToken();

        if (!isMounted) return;

        if (!isValid) {
          logout();
        }
      } catch (error) {
        if (!isMounted) return;
        logout();
      } finally {
        if (isMounted) {
          setIsValidatingToken(false);
        }
      }
    };

    checkToken();

    return () => {
      isMounted = false;
    };
  }, [validateToken, logout]);

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
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Validating your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-gray-950/40 md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id='sidebar'
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='h-full w-72 overflow-y-auto border-r border-gray-200 bg-white px-4 py-6 shadow-lg'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center'>
              <FaBlog size={40} className='text-indigo-600' />
              <h2 className='ml-3 text-xl font-bold text-gray-900'>
                TechUniqueIIT
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='md:hidden text-gray-500 hover:text-indigo-600 transition-colors'
              aria-label='Close sidebar'
            >
              <HiX size={24} />
            </button>
          </div>

          <nav className='space-y-1 pb-28'>
            {visibleMenuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center rounded-lg px-4 py-3 font-medium text-gray-600 transition-all duration-200
                  ${
                    pathname === item.path
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'hover:bg-indigo-50 hover:text-indigo-700'
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

          <div className='absolute bottom-0 left-0 right-0 p-4 bg-white'>
            <div className='flex items-center rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3'>
              <div className='flex-shrink-0'>
                <FaUser className='text-indigo-600' size={32} />
              </div>
              <div className='ml-3 min-w-0'>
                <p className='truncate text-sm font-medium text-gray-900'>
                  {user?.name || 'Loading...'}
                </p>
                <p className='truncate text-xs text-gray-500'>
                  {user?.email || 'Loading...'}
                </p>
                <p className='text-xs font-medium text-indigo-700'>
                  {formatRole(user?.role)}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className='ml-auto text-indigo-500 hover:text-indigo-700 transition-colors'
                aria-label='Log out'
              >
                <FaSignOutAlt size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className='md:ml-72 transition-all duration-300'>
        <header className='sticky top-0 z-20 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur'>
          <div className='flex items-center justify-between px-4 py-4 md:px-6'>
            <div className='flex items-center'>
              <button
                onClick={() => setIsOpen(true)}
                className='md:hidden rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100 focus:outline-none'
                aria-label='Open sidebar'
              >
                <HiMenuAlt3 size={24} />
              </button>
              <div className='ml-4 md:ml-0'>
                <h1 className='text-lg font-semibold text-gray-800'>
                  {visibleMenuItems.find((item) => item.path === pathname)?.title ||
                    'Dashboard'}
                </h1>
                <p className='text-sm text-gray-500'>
                  Welcome back, {user?.name || 'User'}
                </p>
              </div>
            </div>

            {canCreatePosts && (
              <div className='flex items-center space-x-4'>
                <Link
                  href='/dashboard/blogs/create'
                  className='hidden md:flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'
                >
                  <MdCreate className='mr-2' size={18} />
                  New Post
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className='p-4 md:p-6 max-w-7xl mx-auto'>{children}</main>
      </div>
    </div>
  );
}
