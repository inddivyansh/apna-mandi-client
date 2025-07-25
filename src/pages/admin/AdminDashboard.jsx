import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import StatCard from '../../components/admin/StatCard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, orders: 0, totalValue: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard-stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) return <div className="flex justify-center"><LoadingSpinner /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard title="Total Vendors" value={stats.users} />
        <StatCard title="Total Orders Placed" value={stats.orders} />
        <StatCard title="Total Order Value" value={`₹${stats.totalValue.toFixed(2)}`} />
      </div>
    </div>
  );
}
