import axios from 'axios';

// API Configuration - Use proxy in development, direct URL in production
const API_URL = import.meta.env.DEV ? '/api/v1' : 'https://novunt.vercel.app/api/v1';

// For development - set to false to use real API with proxy, true for mock mode
const USE_MOCK_API = false; // Now we can use real API through proxy

// Mock user storage for development (in production this would be a real database)
let mockUserDatabase = [
  {
    email: 'admin@novunt.com',
    password: 'admin123',
    userID: 'mock-admin-123',
    fname: 'Admin',
    lname: 'User',
    username: 'admin'
  },
  {
    email: 'demo@novunt.com', 
    password: 'demo123',
    userID: 'mock-demo-456',
    fname: 'Demo',
    lname: 'User',
    username: 'demo'
  },
  {
    email: 'test@test.com',
    password: 'test123',
    userID: 'mock-test-789',
    fname: 'Test',
    lname: 'User', 
    username: 'testuser'
  },
  {
    email: 'user@test.com',
    password: 'password',
    userID: 'mock-user-101',
    fname: 'Test',
    lname: 'User',
    username: 'testuser'
  },
  {
    email: 'test@example.com',
    password: '123456',
    userID: 'mock-user-102', 
    fname: 'Example',
    lname: 'User',
    username: 'example'
  },
  {
    email: 'Olaitanismail87@gmail.com',
    password: 'OlaitanIsmail@1987',
    userID: 'real-user-olaitan',
    fname: 'Olaitan',
    lname: 'Ismail',
    username: 'olaitan'
  }
];

// Helper function to add new user to mock database
const addUserToMockDatabase = (userData) => {
  mockUserDatabase.push(userData);
  console.log('Added new user to mock database:', userData.email);
  console.log('Total users in mock database:', mockUserDatabase.length);
};

// Mock responses for development
const mockLogin = async (credentials) => {
  console.log('Using mock login for development');
  console.log('Received credentials:', { email: credentials.email, password: credentials.password });
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  // Find matching user by email or username
  console.log('Looking for user with identifier:', credentials.email || credentials.username);
  const user = mockUserDatabase.find(u => {
    const matchEmail = credentials.email && u.email === credentials.email && u.password === credentials.password;
    const matchUsername = credentials.username && u.username === credentials.username && u.password === credentials.password;
    return matchEmail || matchUsername;
  });

  if (user) {
    console.log('User found, login successful!');
    return {
      userID: user.userID,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      username: user.username,
      token: 'mock-jwt-token-' + Date.now()
    };
  } else {
    console.log('User not found. Available test accounts:');
    mockUserDatabase.forEach(u => console.log(`- ${u.email} / ${u.password}`));
    throw { 
      message: `Invalid credentials. Available test accounts:\n• admin@novunt.com / admin123\n• demo@novunt.com / demo123\n• test@test.com / test123\n• user@test.com / password\n• test@example.com / 123456` 
    };
  }
};

// Mock registration for development
const mockSignUp = async (userData) => {
  console.log('Using mock registration for development');
  console.log('Registration data:', { ...userData, password: '[HIDDEN]', confirmPassword: '[HIDDEN]' });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if email already exists in our mock users
  const existingUser = mockUserDatabase.find(u => u.email === userData.email);
  
  if (existingUser) {
    throw { message: 'Email already registered. Please use a different email or sign in.' };
  }
  
  // Store registration data temporarily for OTP verification
  const registrationData = {
    email: userData.email,
    password: userData.password,
    fname: userData.fname,
    lname: userData.lname,
    username: userData.username || userData.email.split('@')[0],
    tempUserId: 'temp-' + Date.now()
  };
  
  // Store in localStorage temporarily (in real app this would be server-side)
  localStorage.setItem('pendingRegistration', JSON.stringify(registrationData));
  
  console.log('Mock registration successful for:', userData.email);
  
  return {
    message: 'Registration successful! Please check your email for verification.',
    userID: registrationData.tempUserId,
    email: userData.email,
    requiresVerification: true
  };
};

// Mock OTP verification for development
const mockVerifyOtp = async (verificationCode, email) => {
  console.log('Using mock OTP verification for development');
  console.log('OTP Code:', verificationCode, 'for Email:', email);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Accept any 6-digit OTP for mock verification
  if (!verificationCode || verificationCode.length !== 6) {
    throw { message: 'Please enter a valid 6-digit verification code' };
  }
  
  // Get pending registration data
  const pendingRegistration = localStorage.getItem('pendingRegistration');
  if (!pendingRegistration) {
    throw { message: 'No pending registration found. Please register again.' };
  }
  
  const registrationData = JSON.parse(pendingRegistration);
  if (registrationData.email !== email) {
    throw { message: 'Email mismatch. Please try again.' };
  }
  
  // Create new user and add to database
  const newUser = {
    userID: 'mock-verified-user-' + Date.now(),
    fname: registrationData.fname,
    lname: registrationData.lname,
    email: registrationData.email,
    username: registrationData.username,
    password: registrationData.password // Store for future logins
  };
  
  // Add to mock database so user can sign in later
  addUserToMockDatabase(newUser);
  
  // Clean up pending registration
  localStorage.removeItem('pendingRegistration');
  
  const mockUserData = {
    userID: newUser.userID,
    fname: newUser.fname,
    lname: newUser.lname,
    email: newUser.email,
    username: newUser.username,
    token: 'mock-jwt-token-verified-' + Date.now(),
    message: 'Account verified successfully!'
  };
  
  console.log('Mock OTP verification successful! User added to database.');
  return mockUserData;
};

export const signUp = async (userData) => {
  // If mock mode is enabled, use mock registration
  if (USE_MOCK_API) {
    return await mockSignUp(userData);
  }

  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (credentials) => {
  // If mock mode is enabled, use mock login
  if (USE_MOCK_API) {
    return await mockLogin(credentials);
  }

  try {
    const loginUrl = `${API_URL}/auth/login`;
    console.log('🔄 Making sign-in request to:', loginUrl);
    console.log('📤 Request payload:', { ...credentials, password: '[HIDDEN]' });
    
    const response = await axios.post(loginUrl, credentials, {
      timeout: 15000, // 15 second timeout
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    console.log('✅ Sign-in API response status:', response.status);
    console.log('📥 Sign-in API response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Sign-in API error:', error);
    
    if (error.response) {
      // Server responded with error status (400, 401, 500, etc.)
      console.log('📄 API Error Response Status:', error.response.status);
      console.log('📄 API Error Response Data:', error.response.data);
      const errorMessage = error.response.data?.message || error.response.data?.error || `Server error (${error.response.status})`;
      throw { message: errorMessage };
    } else if (error.request) {
      // Network error - no response received
      console.error('🌐 Network error - no response from server');
      console.log('📡 Request details:', error.request);
      throw { message: 'Unable to connect to server. Please check your internet connection and try again.' };
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error('⏰ Request timeout');
      throw { message: 'Request timeout. The server is taking too long to respond.' };
    } else {
      // Other error
      console.error('🔥 Unexpected error:', error.message);
      throw { message: error.message || 'An unexpected error occurred during sign-in' };
    }
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
  // If mock mode is enabled, use mock OTP verification
  if (USE_MOCK_API) {
    return await mockVerifyOtp(verificationCode, email);
  }

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
