import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPVerification from "../Modals/OTPVerificationModal";
import logo from "../assets/logo.png";
import backdrop from "../assets/point.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    userData.confirmPassword = userData.password;

    try {
      await signUp(userData);
      toast.success("Account created successfully!");
      setSignupEmail(userData.email);
      setIsOTPModalOpen(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data.errors || [error.response.data.message];
        errors.forEach((err) => toast.error(err));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col md:flex-row bg-white">
      {/* Left Pane */}
      <div className="hidden md:flex w-1/2 flex-col items-start justify-center bg-gradient-to-b from-[#0000FE] to-[#00006D] text-white relative px-10">
        <img src={backdrop} alt="Backdrop" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <img src={logo} alt="Drabux Logo" className="absolute top-6 left-6 w-32 z-10" />
        <div className="z-10 relative pl-10">
          <h2 className="text-5xl font-bold font-grotesk leading-tight">
            Create Your <br /> Account!
          </h2>
        </div>
      </div>

      {/* Right Pane */}
      <div className="w-full md:w-1/2 min-h-screen bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] relative flex flex-col justify-center">
        {/* Mobile Header */}
        <div className="md:hidden absolute top-0 left-0 w-full h-[26vh] bg-gradient-to-b from-[#0000FE] to-[#00006D] z-10">
          <img src={backdrop} alt="Backdrop" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative px-6 pt-6 z-20">
            <img src={logo} alt="Drabux Logo" className="w-24" />
            <h2 className="text-white text-3xl font-bold mt-4 font-grotesk">
              Create Your <br /> Account!
            </h2>
          </div>
        </div>

        {/* Form Container */}
        <div className="z-20 relative mx-auto mt-[26vh] md:mt-0 w-full max-w-md px-6 py-10 bg-white rounded-t-[3rem] shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {[
              { name: "fname", label: "First Name", placeholder: "Enter your First Name" },
              { name: "lname", label: "Last Name", placeholder: "Enter your Last Name" },
              { name: "username", label: "Username", placeholder: "Choose a Username" },
              { name: "email", label: "Email Address", type: "email", placeholder: "Enter your Email" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-lg font-medium hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-700">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <OTPVerification
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        email={signupEmail}
      />
      <ToastContainer />
    </div>
  );
};

export default SignUp;
