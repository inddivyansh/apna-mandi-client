import React from 'react';
import useStore from '../../store';

export default function AdminHeader({ currentPage, setCurrentPage }) {
  const { logout } = useStore();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'procurement', label: 'Procurement' },
    { id: 'orders', label: 'Orders' },
    { id: 'users', label: 'Users' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center text-orange-600 font-bold text-xl">Apna Mandi Admin</div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${ currentPage === item.id ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300' }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
