import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import OrderHistoryItem from '../../components/user/OrderHistoryItem';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        toast.error("Failed to fetch order history.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderHistoryItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
