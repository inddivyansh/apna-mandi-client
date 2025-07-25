import React, { useState } from 'react';
import useStore from '../store';
import { toast } from 'sonner';
import { api } from '../utils/api';

export default function LoginPage() {
  const { login } = useStore();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    toast.info(`Sending OTP to ${phone}...`);
    
    try {
      const res = await api.post('/auth/send-otp', { phone });
      console.log("OTP for testing:", res.data.otpForTesting);
      setStep(2);
      toast.success('OTP sent! Check console or SMS.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    
    try {
      const res = await api.post('/auth/verify-otp', { phone, otp });
      login(res.data);
      toast.success('Login Successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-5xl font-bold text-orange-600 mb-2">अपना मंडी</h1>
        <p className="text-gray-600 mb-8">Street food vendors' trusted partner.</p>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome!</h2>
              <p className="text-gray-500 mb-6">Enter your mobile number to begin.</p>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">+91</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="98765 43210" maxLength="10" />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-orange-600 disabled:bg-orange-300">
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Enter OTP</h2>
              <p className="text-gray-500 mb-6">Sent to +91 {phone}</p>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-center tracking-[0.5em] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="_ _ _ _ _ _" maxLength="6" />
              <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-orange-600 disabled:bg-orange-300">
                {isLoading ? 'Verifying...' : 'Login'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="mt-4 text-sm text-gray-500 hover:text-orange-600">Change Number</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
