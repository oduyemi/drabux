import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ForgotPassword from "./ForgotPassword";
import logo from "../assets/novunt_logo.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, token } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && token) {
      navigate("/app/dashboard");
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    if (!identifier || !password) {
      alert('Please fill in all fields');
      return;
    }

    const credentials = { password };

    if (identifier.includes("@")) {
      credentials.email = identifier;
    } else {
      credentials.username = identifier;
    }

    setIsLoading(true);
    try {
      console.log('Attempting sign-in with credentials:', { ...credentials, password: '[HIDDEN]' });
      await signIn(credentials);
      console.log('Sign-in successful, navigating to dashboard...');
      navigate("/app/dashboard");
    } catch (error) {
      console.error('Sign-in failed:', error);
      // Error is already handled in AuthContext with alert
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A6E] via-[#1A23FF] to-[#0A0A6E] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#A3A3FF] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#1A23FF] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Desktop Left Panel */}
      <div className="hidden lg:flex fixed left-0 top-0 w-1/2 h-full flex-col items-start justify-center bg-black/20 backdrop-blur-sm text-white px-16">
        <div className="space-y-8">
          <div className="flex items-center justify-start">
            <img src={logo} alt="Novunt Logo" className="w-32 h-32 object-contain" />
          </div>
          <div>
            <h2 className="text-6xl font-bold leading-tight mb-6">
              <span className="text-white">Welcome Back</span><br/>
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Stakeholder!</span>
            </h2>
            <div className="space-y-4 text-lg text-[#A3A3FF]">
              <p className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
                <span>Continue your profit journey</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
                <span>Access your staking dashboard</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
                <span>Track your 200% earnings</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center lg:ml-[50%] p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-[#A3A3FF] text-lg">Sign in to continue earning</p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="text-center mb-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0A0A6E] to-[#1A23FF] bg-clip-text text-transparent mb-2">
                  Novunt
                </h1>
                <p className="text-sm text-[#1A23FF] font-medium">
                  No Limits to Value, Net Worth, and Growth.
                </p>
              </div>
              <h2 className="text-2xl font-bold text-[#0A0A6E] mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Username or Email
                </label>
                <input
                  type="text"
                  name="identifier"
                  placeholder="Enter your username or email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1A23FF] focus:border-transparent outline-none transition-all duration-200 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1A23FF] focus:border-transparent outline-none transition-all duration-200 text-sm pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="text-lg">
                      {showPassword ? "🙈" : "👁️‍🗨️"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0A0A6E] via-[#1A23FF] to-[#0A0A6E] text-white py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-8 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A23FF] to-[#0A0A6E] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-[#1A23FF] font-semibold hover:text-[#0A0A6E] transition-colors duration-200 text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link 
                  to="/auth/create" 
                  className="text-[#1A23FF] font-semibold hover:text-[#0A0A6E] transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-[#1A23FF]/20 to-[#A3A3FF]/20 rounded-full blur-xl"></div>
          </div>

          <div className="flex justify-center items-center space-x-6 mt-8 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>

      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default SignIn;
