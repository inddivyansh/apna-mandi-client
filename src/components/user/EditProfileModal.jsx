import React, { useState } from 'react';
import useStore from '../../store';
import { api } from '../../utils/api';
import { toast } from 'sonner';

export default function EditProfileModal({ isOpen, onClose }) {
  const { user, login } = useStore();
  const [name, setName] = useState(user.name);
  const [stallName, setStallName] = useState(user.stallName);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.put('/auth/profile', { name, stallName });
      login(data); // Update the user session with new details
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="stallName" className="block text-sm font-medium text-gray-700">Stall Name</label>
            <input type="text" id="stallName" value={stallName} onChange={(e) => setStallName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-orange-300">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
