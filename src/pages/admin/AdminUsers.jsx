import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) return <div className="flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage All Users</h2>
       <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stall Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cluster</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.stallName || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cluster || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isAdmin ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.isAdmin ? 'Admin' : 'Vendor'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
