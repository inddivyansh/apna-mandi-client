import React, { useState } from 'react';
import useStore from '../../store';
import EditProfileModal from '../../components/user/EditProfileModal';

export default function ProfilePage() {
  const { user, logout } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-orange-200 flex items-center justify-center text-4xl font-bold text-orange-600 mb-4">
            {user.name?.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500">+91 {user.phone}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Stall Name</span>
            <span className="font-semibold">{user.stallName || 'Not set'}</span>
          </div>
          <hr/>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">My Cluster</span>
            <span className="font-semibold">{user.cluster || 'Not set'}</span>
          </div>
        </div>
        
        <div className="space-y-2">
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600"
            >
                Edit Profile
            </button>
            <button
                onClick={logout}
                className="w-full bg-red-100 text-red-700 font-bold py-3 px-4 rounded-lg hover:bg-red-200"
            >
                Logout
            </button>
        </div>
      </div>
    </>
  );
}
