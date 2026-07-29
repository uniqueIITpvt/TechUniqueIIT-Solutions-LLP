'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaSyncAlt,
  FaTimes,
  FaTrash,
  FaUserShield,
} from 'react-icons/fa';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

type Role = 'user' | 'admin' | 'super_admin';
type StaffRole = Exclude<Role, 'user'>;

type ManagedUser = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: Role;
  isActive?: boolean;
  createdAt: string;
};

const createRoles: { value: StaffRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const manageRoles: { value: Role; label: string }[] = [
  { value: 'user', label: 'No Dashboard Access' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const roleLabels: Record<Role, string> = {
  user: 'No Dashboard Access',
  admin: 'Admin',
  super_admin: 'Super Admin',
};

const roleAccess = [
  {
    role: 'Super Admin',
    access:
      'Create users, change roles, assign admin/super admin, delete staff accounts, and access every dashboard section.',
  },
  {
    role: 'Admin',
    access: 'Manage blogs, jobs, applications, messages, and analytics.',
  },
  {
    role: 'No Dashboard Access',
    access: 'Cannot access the dashboard. Use this to revoke staff access.',
  },
];

const getUserId = (user: ManagedUser) => user._id || user.id || '';
const isActiveUser = (user: ManagedUser) => user.isActive !== false;

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    role: 'admin' as Role,
    isActive: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' as StaffRole,
  });

  const isSuperAdmin = user?.role === 'super_admin';

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return users;

    return users.filter((managedUser) => {
      return (
        managedUser.name.toLowerCase().includes(query) ||
        managedUser.email.toLowerCase().includes(query) ||
        roleLabels[managedUser.role].toLowerCase().includes(query)
      );
    });
  }, [searchTerm, users]);

  const fetchUsers = useCallback(async () => {
    if (!isSuperAdmin) return;

    try {
      setIsLoading(true);
      const response = await api.get('/api/users');
      setUsers(response.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }, [isSuperAdmin]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsCreating(true);
      await api.post('/api/users', formData);
      toast.success('User created successfully');
      setFormData({ name: '', email: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setIsCreating(false);
    }
  };

  const openEditModal = (targetUser: ManagedUser) => {
    setEditingUser(targetUser);
    setEditForm({
      name: targetUser.name,
      role: targetUser.role,
      isActive: isActiveUser(targetUser),
    });
  };

  const handleSaveUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingUser) return;

    const id = getUserId(editingUser);

    try {
      setUpdatingUserId(id);
      const response = await api.patch(`/api/users/${id}`, editForm);
      const updatedUser = response.data.data;

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          getUserId(item) === id ? { ...item, ...updatedUser } : item
        )
      );
      setEditingUser(null);
      toast.success('User updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (targetUser: ManagedUser) => {
    const id = getUserId(targetUser);
    const confirmed = window.confirm(
      `Delete ${targetUser.name}? This will remove the staff login account.`
    );

    if (!confirmed) return;

    try {
      setDeletingUserId(id);
      await api.delete(`/api/users/${id}`);
      setUsers((currentUsers) => currentUsers.filter((item) => getUserId(item) !== id));
      toast.success('User deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeletingUserId(null);
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className='rounded-lg border border-red-200 bg-red-50 p-6'>
        <h2 className='text-lg font-semibold text-red-800'>Access Denied</h2>
        <p className='mt-2 text-sm text-red-700'>
          Only super admin users can manage dashboard accounts and roles.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>Users</h1>
          <p className='mt-1 text-sm text-gray-500'>
            Create internal dashboard accounts and control who has admin access.
          </p>
        </div>
        <button
          type='button'
          onClick={fetchUsers}
          className='inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          <FaSyncAlt className='mr-2' />
          Refresh
        </button>
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='border-b border-gray-200 px-5 py-4'>
          <div className='flex items-center gap-2'>
            <FaShieldAlt className='text-indigo-600' />
            <h2 className='text-lg font-semibold text-gray-900'>Access Rules</h2>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                  Role
                </th>
                <th className='px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                  Access
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {roleAccess.map((item) => (
                <tr key={item.role}>
                  <td className='whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900'>
                    {item.role}
                  </td>
                  <td className='px-5 py-4 text-sm text-gray-600'>{item.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form
        onSubmit={handleCreateUser}
        className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'
      >
        <div className='mb-4 flex items-center gap-2 text-gray-900'>
          <FaPlus className='text-indigo-600' />
          <h2 className='text-lg font-semibold'>Create Staff Account</h2>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              required
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              required
              value={formData.email}
              onChange={(event) =>
                setFormData((current) => ({ ...current, email: event.target.value }))
              }
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              required
              minLength={6}
              value={formData.password}
              onChange={(event) =>
                setFormData((current) => ({ ...current, password: event.target.value }))
              }
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Initial Role
            </label>
            <select
              value={formData.role}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  role: event.target.value as StaffRole,
                }))
              }
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
            >
              {createRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type='submit'
          disabled={isCreating}
          className='mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60'
        >
          <FaUserShield className='mr-2' />
          {isCreating ? 'Creating...' : 'Create Staff Account'}
        </button>
      </form>

      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='flex flex-col gap-4 border-b border-gray-200 px-5 py-4 md:flex-row md:items-center md:justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Role Management</h2>
          <div className='relative w-full md:w-80'>
            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='search'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder='Search users...'
              className='w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
            />
          </div>
        </div>

        {isLoading ? (
          <div className='p-6 text-sm text-gray-500'>Loading users...</div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                    User
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                    Role
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                    Status
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                    Created
                  </th>
                  <th className='px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {filteredUsers.map((managedUser) => {
                  const id = getUserId(managedUser);
                  const isCurrentUser = id === user?._id;
                  const isDeleting = deletingUserId === id;

                  return (
                    <tr key={id}>
                      <td className='px-5 py-4'>
                        <div className='font-medium text-gray-900'>
                          {managedUser.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {managedUser.email}
                        </div>
                        {isCurrentUser && (
                          <div className='mt-1 text-xs font-medium text-indigo-600'>
                            Current account
                          </div>
                        )}
                      </td>
                      <td className='px-5 py-4 text-sm text-gray-700'>
                        {roleLabels[managedUser.role]}
                      </td>
                      <td className='px-5 py-4'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            isActiveUser(managedUser)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {isActiveUser(managedUser) ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className='px-5 py-4 text-sm text-gray-500'>
                        {new Date(managedUser.createdAt).toLocaleDateString()}
                      </td>
                      <td className='px-5 py-4'>
                        <div className='flex justify-end gap-2'>
                          <button
                            type='button'
                            disabled={isCurrentUser}
                            onClick={() => openEditModal(managedUser)}
                            className='inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                          >
                            <FaEdit className='mr-2' />
                            Edit
                          </button>
                          <button
                            type='button'
                            disabled={isCurrentUser || isDeleting}
                            onClick={() => handleDeleteUser(managedUser)}
                            className='inline-flex items-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50'
                          >
                            <FaTrash className='mr-2' />
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className='p-6 text-center text-sm text-gray-500'>No users found.</div>
            )}
          </div>
        )}
      </div>

      {editingUser && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
          <form
            onSubmit={handleSaveUser}
            className='w-full max-w-xl rounded-lg bg-white p-6 shadow-2xl'
          >
            <div className='mb-5 flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-gray-900'>Edit User</h2>
              <button
                type='button'
                onClick={() => setEditingUser(null)}
                className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                aria-label='Close edit modal'
              >
                <FaTimes />
              </button>
            </div>

            <div className='space-y-5'>
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  type='text'
                  required
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className='w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  Role
                </label>
                <select
                  value={editForm.role}
                  onChange={(event) =>
                    setEditForm((current) => ({ ...current, role: event.target.value as Role }))
                  }
                  className='w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                >
                  {manageRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className='inline-flex cursor-pointer items-center gap-3'>
                <input
                  type='checkbox'
                  checked={editForm.isActive}
                  onChange={(event) =>
                    setEditForm((current) => ({ ...current, isActive: event.target.checked }))
                  }
                  className='peer sr-only'
                />
                <span className='relative h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-green-600 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5'></span>
                <span className='text-sm font-medium text-gray-800'>Active</span>
              </label>
            </div>

            <div className='mt-6 flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => setEditingUser(null)}
                className='rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={updatingUserId === getUserId(editingUser)}
                className='rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60'
              >
                {updatingUserId === getUserId(editingUser) ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
