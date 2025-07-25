import React from 'react';

export default function OrderHistoryItem({ order }) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {order.status}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3">{orderDate}</p>
      <div className="space-y-1 text-sm">
        {order.orderItems.map(item => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>₹{order.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
