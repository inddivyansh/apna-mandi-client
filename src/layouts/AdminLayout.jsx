import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminProcurement from '../pages/admin/AdminProcurement';

export default function AdminLayout() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'orders':
        return <AdminOrders />;
      case 'users':
        return <AdminUsers />;
      case 'procurement':
        return <AdminProcurement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <AdminHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}