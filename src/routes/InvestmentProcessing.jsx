import React from "react";
import investmentIcon from "../assets/invest-process.png"; // Adjust path as needed
import { Link } from "react-router-dom";

const InvestmentProcessing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white space-y-6">
      <div className="text-center p-6 max-w-md">
        <h2 className=" font-semibold text-[#00006D] text-3xl font-grotesk">
          Your Investment <br /> is Being Processed!
        </h2>

        <p className="font-serif text-sm text-[#00006D] mt-6 ">
          You will receive a confirmation email <br />
          shortly with your investment details.
        </p>

        <img src={investmentIcon} alt="Investment Icon" className="w-26 h-26 mx-auto my-4" />
        <Link to="/app/dashboard">
        <button className="mt-4 w-full bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700 transition">
          Go To Dashboard
        </button>
        </Link>
      </div>
    </div>
  );
};

export default InvestmentProcessing;
