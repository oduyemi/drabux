import { useState, useEffect, useRef } from "react";
import ResetVerificationSuccess from "./ResetVerificationSuccess";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isOpen) emailRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isCodeModalOpen) {
      otpRefs[0].current?.focus();
      setTimer(60);
      setError("");
      setOtp(["", "", "", "", "", ""]);
    }
  }, [isCodeModalOpen]);

  // Timer Countdown
  useEffect(() => {
    if (isCodeModalOpen && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isCodeModalOpen, timer]);

  const handleSendResetLink = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://novunt.vercel.app/api/v1/auth/reset-password/request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send reset link");
      }

      setIsCodeModalOpen(true);
      setTimeout(onClose, 100);
    } catch (error) {
      setError(error.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };


  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < otp.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setError("");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Enter all 6 digits of the verification code");
      return;
    }

    try {
      const res = await fetch(
        "https://novunt.vercel.app/api/v1/auth/reset-password/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token: enteredOtp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid code");
      }

      // ✅ Store email and token in localStorage
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetToken", enteredOtp);

      setIsVerified(true);
    } catch (error) {
      setError(error.message || "Verification failed");
    }
  };

  if (!isOpen && !isCodeModalOpen && !isVerified) return null;

  return (
    <>
      {/* Reset Password Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-90 flex items-center justify-center z-50 mx-8">
          <div className="bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] text-black p-6 rounded-lg shadow-2xl w-80 relative animate-fadeIn">
            <button
              onClick={onClose}
              className="absolute top-4 font-extrabold right-4 text-gray-600 hover:text-gray-900"
            >
              X
            </button>
            <h2 className="text-3xl md:text-2xl font-semibold mb-4 text-[#00006D] font-grotesk">
              Password <br /> Recovery
            </h2>
            <p className="text-sm text-gray-600 mb-14">
              Please enter the email address associated with your account. We'll
              send you a link to reset your password.
            </p>
            <div>
              <p className="text-[#00006D] font-medium mb-4">Email Address</p>
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={handleSendResetLink}
                disabled={loading}
                className="px-2 py-4 w-full font-semibold bg-gradient-to-r from-[#0000FE] to-[#00006D] hover:opacity-90 transition text-white rounded-lg text-sm disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enter Code Modal */}
      {isCodeModalOpen && !isVerified && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-90 flex items-center justify-center">
          <div className="bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] text-black p-6 rounded-lg shadow-2xl w-86 relative animate-fadeIn">
            <button
              onClick={() => setIsCodeModalOpen(false)}
              aria-label="Close"
              className="absolute font-extrabold top-2 right-4 text-gray-600 hover:text-gray-400 "
            >
              X
            </button>
            <h1 className="text-3xl font-semibold mb-4 text-[#00006D]">
              Check Your Email
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              We sent a 6-digit code to your email.
            </p>

            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-4 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 border-2 border-dashed border-gray-400 rounded-full text-center text-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ))}
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <p className="text-center text-gray-600 text-sm mb-4">
              Resend Code in <span className="font-bold">{timer}s</span>
            </p>
            <button
              onClick={handleResendCode}
              disabled={timer > 0}
              className={`px-4 py-2 w-full rounded-lg text-sm transition ${
                timer > 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#0000FE] to-[#00006D] text-white hover:opacity-90"
              }`}
            >
              Resend Code
            </button>
           
            <button
              onClick={handleVerifyOtp}
              className="mt-4 px-4 py-4 w-full bg-gradient-to-r from-[#0000FE] to-[#00006D] text-white rounded-lg text-sm hover:opacity-90 transition"
            >
              Verify Code
            </button>
            
          </div>
        </div>
      )}

      {/* Verification Success Page */}
      
      {isVerified && <ResetVerificationSuccess onClose={() => setIsVerified(false)} />}

    </>
  );
};

export default ForgotPassword;
