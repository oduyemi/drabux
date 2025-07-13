import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ForgotPassword from "./ForgotPassword";
import logo from "../assets/logo.png";
import backdrop from "../assets/point.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const credentials = { password };

  if (identifier.includes("@")) {
    credentials.email = identifier;
  } else {
    credentials.username = identifier;
  }

  try {
    await signIn(credentials);
    navigate("/app/dashboard");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side (Desktop Visual) */}
      <div className="hidden md:flex md:w-1/2 h-screen relative items-center justify-center bg-gradient-to-b from-[#0000FE] to-[#00006D] text-white px-10">
        <img
          src={backdrop}
          alt="Backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <img src={logo} alt="Drabux Logo" className="absolute top-6 left-6 w-32" />
        <div className="relative z-10 pl-10">
          <h2 className="text-5xl font-bold font-grotesk leading-tight">
            Welcome Back <br /> Visionary!
          </h2>
        </div>
      </div>

      {/* Right Side (Form Section) */}
      <div className="w-full md:w-1/2 flex flex-col h-screen bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] relative">
        <div className="md:hidden absolute top-0 left-0 w-full h-[26vh] bg-gradient-to-b from-[#0000FE] to-[#00006D] z-10">
          <img
            src={backdrop}
            alt="Backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-20 px-6 pt-6">
            <img src={logo} alt="Drabux Logo" className="w-24" />
            <h2 className="text-white text-3xl font-bold mt-4 font-grotesk">
              Welcome Back <br /> Visionary!
            </h2>
          </div>
        </div>

        {/* Form Card */}
        <div className="z-20 relative mt-[26vh] md:mt-0 flex-grow flex flex-col justify-center px-6 md:px-0">
          <div className="mx-auto w-full max-w-md bg-white rounded-t-[3rem] shadow-xl px-8 py-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Identifier Field */}
              <div>
                <label className="block text-sm font-medium bg-[#cecef1] p-3 rounded-lg">
                  Username or Email
                </label>
                <input
                  type="text"
                  name="identifier"
                  placeholder="Enter your username or email"
                  required
                  className="w-full px-4 py-3 bg-transparent placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium bg-[#cecef1] p-3 rounded-lg">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 bg-transparent placeholder-gray-500 focus:outline-none pr-10"
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-lg font-medium hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>

            {/* Forgot Password */}
            <div className="text-center mt-5">
              <button
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-sm text-[#0000FE] font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign Up */}
            <p className="text-center text-sm mt-4 text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/auth/create"
                className="text-[#0000FE] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default SignIn;
