'use client';

import React from 'react';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
