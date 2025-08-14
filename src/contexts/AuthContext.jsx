import { createContext, useContext, useState, useEffect } from 'react';
import { signUp as signUpService, signIn as signInService, verifyOtp as verifyOtpService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Retrieve auth state from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const signUp = async (userData) => {
    try {
      const response = await signUpService(userData);
      // setUser(response.user);
      // setToken(response.token);
      // localStorage.setItem('user', JSON.stringify(response.user));
      // localStorage.setItem('token', response.token);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await signInService(credentials);
      console.log('Sign-in response:', response); // Debug log
      
      // Handle different response structures
      const userData = response.data || response;
      const user = {
        userID: userData.userID || userData._id || userData.id,
        fname: userData.fname || userData.firstName,
        lname: userData.lname || userData.lastName,
        email: userData.email,
        username: userData.username
      };
      
      const token = userData.token || response.token;
      
      if (!token) {
        throw new Error('No authentication token received');
      }
      
      setUser(user);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      return response; // Return response for success handling
    } catch (error) {
      console.error('Sign-in error:', error);
      const errorMessage = error.message || error.error || 'Sign-in failed';
      alert(errorMessage);
      throw error;
    }
  };

  const verifyOtp = async (otp, email) => {
    try {
      const response = await verifyOtpService(otp, email);
      const user = {
        userID: response.userID,
        fname: response.fname,
        lname: response.lname,
        email: response.email,
        username: response.username
      };
      setUser(user);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      alert(error.message || 'OTP verification failed');
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('hasSeenActivityPopup'); // Clear popup tracking too
  };

  // Debug function to clear all auth data
  const clearAllAuthData = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clear everything
    console.log('All authentication data cleared');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, signOut, verifyOtp, clearAllAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
