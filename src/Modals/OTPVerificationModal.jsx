import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const OTPVerificationModal = ({ isOpen, onClose, onVerify, email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isOpen) {
      otpRefs[0].current?.focus();
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [isOpen, timer]);

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const { verifyOtp } = useAuth();

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    try {
      await verifyOtp(enteredOtp, email);
      onVerify();
    } catch (error) {
      // alert is already handled in context
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mx-8 fixed inset-0 bg-black/50 flex items-center justify-center z-50 bg-gradient-to-tr from-[#F5F5F5] to-[#D8DAFF]">
      <div className="bg-white w-96 p-8 rounded-3xl border border-blue-500 shadow-lg relative">
        {/* Back Button */}
        <button className="absolute top-6 left-6 text-blue-600 text-2xl" onClick={onClose}>
          <IoArrowBack />
        </button>

        {/* Title */}
        <h1 className=" text-2xl font-bold text-center font-grotesk text-[#00006D]">Verify Your Account</h1>
        <p className="text-gray-600 text-center mt-2">
          A verification code has been sent to your email.<br /> Please enter the code below to verify your account.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={otpRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-8 h-8 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          ))}
        </div>

        {/* Resend Code Timer */}
        <p className="text-center text-gray-600 mt-4">
          Resend Code In <span className="text-blue-600 font-semibold">00:{timer < 10 ? `0${timer}` : timer}</span>
        </p>

        {/* Verify Button */}
        <Link to="/auth/verification-success">
        <button
          onClick={handleVerifyOtp}
          className="w-full mt-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl shadow-md hover:opacity-90 transition"
        >
          Verify
        </button>
        </Link>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
