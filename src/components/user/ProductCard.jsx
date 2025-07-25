import React from 'react';
import useStore from '../../store';

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useStore();
  const quantity = cart[product._id] || 0;

  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col text-center bg-white shadow-sm transition-shadow hover:shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-3" onError={(e) => e.target.src='https://placehold.co/100x100/CCCCCC/FFFFFF?text=Error'}/>
      <div className="flex-grow">
        <h3 className="font-bold text-sm text-gray-800">{product.name} ({product.hindiName})</h3>
        <p className="text-xs text-gray-500">₹{product.price} / {product.unit}</p>
      </div>
      <div className="mt-3">
        {quantity === 0 ? (
          <button onClick={() => addToCart(product._id)} className="w-full bg-orange-100 text-orange-600 font-bold py-2 px-3 rounded-lg hover:bg-orange-200 text-sm">Add</button>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <button onClick={() => removeFromCart(product._id)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-300">-</button>
            <span className="font-bold text-lg w-8 text-center">{quantity}</span>
            <button onClick={() => addToCart(product._id)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-300">+</button>
          </div>
        )}
      </div>
    </div>
  );
}