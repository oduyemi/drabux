import React, { useState } from "react";
import ProfileImg from "../assets/profileImg.png";
import backdrop from "../assets/point.png";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { editProfile, uploadProfilePicture } from "../services/auth";

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(ProfileImg);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Update profile data
      await editProfile(formData);

      // Update profile picture if selected
      if (profilePicture) {
        await uploadProfilePicture(profilePicture);
      }

      // Handle success (e.g., show success message, redirect, etc.)
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Blue background section with backdrop */}
      <div className="relative w-full h-80 bg-[#0000FE] text-white py-6 text-center text-lg font-semibold">
        <img
          src={backdrop}
          alt="Backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <span>Edit Profile</span>
      </div>

      {/* Profile Picture */}
      <div className="relative w-24 h-24 mt-[-30px]">
        <img
          src={previewImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white object-contain"
        />
        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
          <label htmlFor="profile-picture" className="cursor-pointer">
            <FaCamera className="text-blue-600" />
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md lg:max-w-2xl mt-4 p-4 ">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name (e.g., John)"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name (e.g., Doe)"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email (e.g., john@example.com)"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 bg-gradient-to-b from-[#0000FE] to-[#00006D] text-white font-semibold rounded-md shadow-md hover:bg-blue-700 p-4 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
