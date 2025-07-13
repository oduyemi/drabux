import React from "react";
import rocketIcon from "../assets/rocket.png"; // Adjust path as needed
import { Link } from "react-router-dom";

const WithdrawalProcessing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="text-center p-6 max-w-md">
      <h2 className="text-3xl lg:text-4xl font-semibold text-[#00006D] font-grotesk">
        Withdrawal
        in Progress
        </h2>
        <img src={rocketIcon} alt="Rocket Icon" className="w-16 h-16 mx-auto mb-4 mt-8" />

        <p className="text-[#00006D] mt-2 text-xl font-serif ">
          You’ll receive a confirmation once the funds reach your wallet.
        </p>
        <Link to="/app/dashboard">
        <button className="mt-6 w-full text-white py-3 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 transition bg-gradient-to-tr from-[#0000FE] to-[#00006D]">
          Go To Dashboard
        </button>
        </Link>
      </div>
    </div>
  );
};

export default WithdrawalProcessing;
