import React, { useEffect, useState } from 'react';
import useStore from './store';
import LoginPage from './pages/LoginPage';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import { Toaster } from 'sonner';
import LoadingSpinner from './components/shared/LoadingSpinner';

export default function App() {
  const { user, token, checkUserSession } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserSession();
    setIsLoading(false);
  }, [checkUserSession]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-600">अपना मंडी</h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      {!token ? (
        <LoginPage />
      ) : user?.isAdmin ? (
        <AdminLayout />
      ) : (
        <UserLayout />
      )}
    </>
  );
}
