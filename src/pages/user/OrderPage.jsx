import React, { useEffect, useState } from 'react';
import useStore from '../../store';
import ProductCard from '../../components/user/ProductCard';
import CartSheet from '../../components/user/CartSheet';
import { api } from '../../utils/api';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

export default function OrderPage() {
  const { cart } = useStore();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        setError('Could not load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  if (isLoading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Place Your Order</h1>
      
      {/* --- RESPONSIVE GRID --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Cart button remains fixed for mobile, but will be less intrusive on desktop */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-20">
            <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center space-x-3 hover:bg-green-700 transition-all transform hover:scale-105"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="hidden sm:inline">View Cart</span>
                <span>({cartItemCount})</span>
            </button>
        </div>
      )}
      
      <CartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        products={products}
      />
    </div>
  );
}
