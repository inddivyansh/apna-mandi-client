import React from 'react';
import useStore from '../../store';

export default function HomePage({ setCurrentPage }) {
  const { user } = useStore();
  
  const WHATSAPP_SUPPORT_NUMBER = "919785203790";
  const WHATSAPP_GREETING_MESSAGE = "Hello Apna Mandi, I need help with my account.";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hello, {user.name?.split(' ')[0]}!</h1>
        <p className="text-gray-500">{user.stallName || 'Your Stall'}</p>
      </div>

      <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold">Ready for tomorrow's order?</h2>
        <p className="mt-1 text-sm opacity-90">Place your order before 10 PM for guaranteed morning delivery.</p>
        <button 
          onClick={() => setCurrentPage('order')} 
          className="mt-4 w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Place New Order
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <h2 className="font-bold text-lg mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setCurrentPage('history')} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-orange-100 transition-colors">
             <svg className="h-8 w-8 text-orange-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            <span className="font-semibold text-sm">My Orders</span>
          </button>
           
           {/* --- THIS IS THE CORRECTED BUTTON --- */}
           <a 
             href={`https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING_MESSAGE)}`} 
             target="_blank" 
             rel="noopener noreferrer" 
             className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-green-100 transition-colors"
           >
             <svg className="h-8 w-8 text-green-500 mb-2" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.803 6.166l-1.225 4.485 4.574-1.196z" /></svg>
            <span className="font-semibold text-sm">WhatsApp Help</span>
          </a>
        </div>
      </div>
    </div>
  );
}
