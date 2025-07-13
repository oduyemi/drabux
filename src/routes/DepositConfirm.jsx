import React, { useState } from "react";
import { FaRegCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import cardImage from "../assets/rectangle-img.png"; // Replace with your actual image path

const DepositConfirm = () => {
  const walletAddress = "Ex648775658623656t6g75w8767vgvsscvtqf7";
  const [showBalance, setShowBalance] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
      {/* Card Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-3">
        
        {/* Account Balance Section with Image Background */}
        <div className="relative">
          <img
            src={cardImage}
            alt="Card Background"
            className="w-full h-[240px] rounded-xl shadow-lg object-cover"
          />
          
          {/* Text Overlay on Image */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-6 py-6 text-white">
            <p className="text-sm font-grotesk">Account Balance</p>
            <h2 className="text-5xl font-bold">
              {showBalance ? "$2000" : "****"}
            </h2>
            <div className="flex justify-between text-sm w-full mt-2">
              <p>Total Deposit: <span className="font-semibold">$12000</span> |</p>
              <p>Earnings: <span className="font-semibold">$500</span></p>
            </div>
            
            {/* DLP Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-tr from-[#F5F5F5] to-[#D8DAFF] text-blue-700 px-4 py-2 rounded-md text-xs font-bold">
              1250 DLP
            </div>

            <button
              onClick={() => setShowBalance(!showBalance)}
              className="mt-2 text-white hover:text-gray-200"
            >
              {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* Deposit Details */}
        <div className="text-center mt-6">
          <h2 className="text-3xl font-semibold text-[#00006D] font-grotesk mb-4">
            Your USDT <br /> Deposit Address
          </h2>
          <p className="text-gray-600 text-sm">
            Send exactly <span className="font-semibold text-black">$1000 USDT</span> to the address below.
            Ensure you meet the minimum deposit amount of 10 USDT.
          </p>
        </div>

        {/* Wallet Address */}
        <div className="mt-6 bg-gray-100 flex items-center justify-between p-4 rounded-lg shadow-md text-gray-800">
          <span className="text-sm font-mono break-all">{walletAddress}</span>
          <button onClick={copyToClipboard} className="text-blue-700 hover:text-blue-500">
            <FaRegCopy size={20} />
          </button>
        </div>

        {/* Copy Address Button */}
        <button
          onClick={copyToClipboard}
          className="w-full mt-6 bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          Copy Address
        </button>

        {/* No Transaction Fees Section */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center shadow-md">
          <p className="text-gray-700 text-sm font-semibold">No Transaction Fees:</p>
          <p className="text-gray-500 text-sm">Your full deposit amount will be credited</p>
        </div>

        {/* I've Deposited Button */}
        <Link to="/deposit-process">
          <button className="w-full mt-6 bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700">
            I've Deposited
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DepositConfirm;
