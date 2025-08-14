import React from "react";
import rocketIcon from "../assets/rocket.png";
import { Link } from "react-router-dom";

const DepositProcess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white px-4">
      <div className="text-center p-6 max-w-md w-full animate-fade-in">
        <h2 className="font-semibold text-[#00006D] text-3xl sm:text-4xl font-grotesk mb-4 leading-tight">
          Your Deposit is <br /> Being Processed!
        </h2>

        <img
          src={rocketIcon}
          alt="Rocket launching"
          className="w-16 h-16 mx-auto mb-6 animate-bounce-slow"
          aria-hidden="true"
        />

        <p className="text-sm sm:text-base text-[#00006D] mb-6">
          You'll receive an email once your funds are available in your Novunt wallet.
        </p>

        <Link to="/app/dashboard" aria-label="Go to dashboard">
          <button className="w-full bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold shadow-md transition duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Go To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DepositProcess;
