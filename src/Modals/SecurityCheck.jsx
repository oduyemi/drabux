import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SecurityCheck = ({ onClose }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(52);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-96 rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-[#00006D]">Security Check</h2>
        <p className="text-gray-500 text-sm mt-2">For your protection, enter the one-time password (OTP) sent to your email</p>
        
        <div className="flex justify-center gap-3 my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00006D]"
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm">Resend OTP In <span className="text-blue-600 font-semibold">00:{timer < 10 ? `0${timer}` : timer}</span></p>
     
        <button className="w-full mt-4 bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700">
          Verify
        </button>
      
        <button onClick={onClose} className="mt-2 text-gray-500 text-sm underline">Cancel</button>
      </div>
    </div>
  );
};

export default SecurityCheck;