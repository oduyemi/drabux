import axios from 'axios';

const API_URL = 'https://novunt.vercel.app/api/v1';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth//request-password-reset`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');  // Make sure you store this on login

    const response = await axios.patch(`${API_URL}/users/${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const verifyOtp = async (verificationCode, email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/complete-registration`, { verificationCode, email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('profilePicture', file); 

    const response = await axios.patch(`${API_URL}/users/user/${userId}/profile-picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
