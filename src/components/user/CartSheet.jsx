import React from 'react';
import useStore from '../../store';
import { toast } from 'sonner';
import { api } from '../../utils/api';

export default function CartSheet({ isOpen, onClose, products }) {
  const { cart, clearCart } = useStore();
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
      const product = products.find(p => p._id === id);
      if (!product) return null;
      return { ...product, quantity };
    }).filter(item => item && item.quantity > 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    const orderData = {
      orderItems: cartItems.map(item => ({ productId: item._id, name: item.name, quantity: item.quantity, price: item.price })),
      totalPrice: total,
    };

    try {
      await api.post('/orders', orderData);
      toast.success('Order Placed!', { description: `Your order for ₹${total} is confirmed.` });
      clearCart();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center md:items-start md:pt-20" onClick={onClose}>
      <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {cartItems.length > 0 ? cartItems.map(item => (
            <div key={item._id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price}</p>
              </div>
              <p className="font-bold">₹{item.price * item.quantity}</p>
            </div>
          )) : <p className="text-center text-gray-500">Your cart is empty.</p>}
        </div>
        {cartItems.length > 0 && (
          <>
            <hr className="my-4"/>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Delivery & Service Fee</span><span className="font-medium">₹{deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
            <button onClick={handlePlaceOrder} disabled={isPlacingOrder} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-xl mt-6 hover:bg-orange-600 disabled:bg-orange-300">
              {isPlacingOrder ? 'Placing Order...' : `Place Order (₹${total.toFixed(2)})`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
