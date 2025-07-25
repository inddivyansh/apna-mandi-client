import React, { useState } from 'react';
import HomePage from '../pages/user/HomePage';
import OrderPage from '../pages/user/OrderPage';
import ProfilePage from '../pages/user/ProfilePage';
import OrderHistoryPage from '../pages/user/OrderHistoryPage';
import BottomNav from '../components/user/BottomNav';
import TopNav from '../components/user/TopNav'; // <-- NEW

export default function UserLayout() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'order':
        return <OrderPage />;
      case 'history':
        return <OrderHistoryPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      {/* Top navigation for medium screens and up */}
      <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </div>

      {/* Bottom navigation for mobile screens */}
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
