import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

export default function AdminProcurement() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await api.get('/admin/procurement-list');
        setList(data);
      } catch (error) {
        toast.error("Failed to fetch procurement list");
      } finally {
        setIsLoading(false);
      }
    };
    fetchList();
  }, []);

  if (isLoading) return <div className="flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Daily Procurement List (For Today's Orders)</h2>
      {list.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No orders have been placed today.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {list.map(item => (
                <tr key={item.productId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
