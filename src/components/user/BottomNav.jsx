import React from 'react';

const NavItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
  >
    {icon(isActive)}
    <span className="text-xs font-medium mt-1">{label}</span>
  </button>
);

const HomeIcon = (isActive) => ( <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> );
const OrderIcon = (isActive) => ( <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> );
const HistoryIcon = (isActive) => ( <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const ProfileIcon = (isActive) => ( <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );

export default function BottomNav({ currentPage, setCurrentPage }) {
  return (
    // --- HIDE ON DESKTOP ---
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-10">
      <div className="bg-white border-t border-gray-200 flex justify-around shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        <NavItem icon={HomeIcon} label="Home" isActive={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
        <NavItem icon={OrderIcon} label="New Order" isActive={currentPage === 'order'} onClick={() => setCurrentPage('order')} />
        <NavItem icon={HistoryIcon} label="History" isActive={currentPage === 'history'} onClick={() => setCurrentPage('history')} />
        <NavItem icon={ProfileIcon} label="Profile" isActive={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
      </div>
    </div>
  );
}
