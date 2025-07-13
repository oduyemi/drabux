import React from "react";
import rocketIcon from "../assets/rocket.png"; // Adjust path as needed
import { Link } from "react-router-dom";

const DepositProcess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="text-center p-6 max-w-md">

        <h2 className=" font-semibold text-[#00006D] font-grotesk text-3xl">
          Your Deposit is <br /> Being Processed!
        </h2>
        <img src={rocketIcon} alt="Rocket Icon" className="w-16 h-16 mx-auto mb-4" />
        <p className=" mt-2 text-sm text-[#00006D]">
          You'll receive an email once your funds are available in your Drabux wallet.
        </p>
        <Link to="/app/dashboard">
        <button className="mt-6 w-full bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 transition">
          Go To Dashboard
        </button>
        </Link>
      </div>
    </div>
  );
};

export default DepositProcess;
