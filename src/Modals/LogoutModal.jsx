import React from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-[9999] animate-fade-in">
      
      {/* Modal Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 lg:w-96 relative transform scale-95 transition-all duration-300">
        
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <FaSignOutAlt className="text-blue-500 text-5xl mx-auto animate-bounce" />
          <h3 className="text-xl font-semibold text-gray-900 mt-4">
            Are you sure you want to log out?
          </h3>
          <p className="text-gray-600 text-sm mt-2">You will be signed out of your account.</p>
          
          {/* Buttons */}
          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={onClose}
              className="w-1/2 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-1/2 py-2 bg-blue-800 text-white rounded-md hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
