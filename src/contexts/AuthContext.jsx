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
    } catch (error) {
      alert(error.message);
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
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, signOut, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
