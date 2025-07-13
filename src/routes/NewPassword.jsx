import React, { useState } from 'react';
import logo from "../assets/logo.png";
import backdrop from "../assets/point.png";
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from "../services/auth";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Extract token from URL query parameters
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (!token) {
        throw new Error('Invalid reset token');
      }

      await resetPassword(token, newPassword);
      // Handle success (e.g., redirect to login, show success message)
    } catch (error) {
      setError(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center relative bg-gradient-to-b from-[#0000FE] to-[#00006D] text-white">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 h-screen flex-col items-start justify-center relative p-10">
        <img src={logo} alt="Drabux Logo" className="absolute top-6 left-6 w-32 h-auto" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={backdrop} 
            alt="Backdrop" 
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 scale-110 opacity-60 mix-blend-overlay"
          />
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-6xl font-semibold text-center z-20 font-grotesk">
            Reset Your <br /> Password
          </h2>
        </div>
      </div>

      {/* Right Side - Password Reset Form */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center p-6">
        {/* Mobile View - Logo */}
        <div className="w-full flex items-center justify-start md:hidden px-6 mt-6">
          <img src={logo} alt="Drabux Logo" className="w-24 h-auto" />
        </div>

        {/* Mobile View - Title */}
        <div className="md:hidden w-full text-center mt-8 z-50">
          <h2 className="text-4xl font-semibold font-grotesk">Create A New <br/> Password</h2>
        </div>

        {/* Mobile View - Backdrop */}
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-full md:hidden">
          <img 
            src={backdrop} 
            alt="Backdrop" 
            className="w-4/5 mx-auto opacity-40 mix-blend-overlay"
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md bg-white text-black p-6 rounded-tl-[40px] rounded-tr-[40px] rounded-b-lg shadow-lg mt-6 relative z-10">
          <p className="mt-8 text-gray-600 font-serif">
            Create a new strong password and regain <br/>access to your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium bg-[#cecef1] p-3 rounded-lg">New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-500"
                placeholder="Enter new password" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium bg-[#cecef1] p-3 rounded-lg">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-500"
                placeholder="Confirm new password" 
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full p-3 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#0000FE] to-[#00006D] hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
