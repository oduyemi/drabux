import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import cardImage from "../assets/rectangle-img.png";
import SecurityCheck from "../Modals/SecurityCheck"; // Import the modal
import { Link } from "react-router-dom";

const WithdrawalConfirm = () => {
  const walletAddress = "Ex648775658623656t6g75w8767vgvsscvtqf7";
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
      {/* Card Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-3">
        
        {/* Account Balance Section */}
        <div className="relative">
          <img
            src={cardImage}
            alt="Card Background"
            className="w-full h-[240px] rounded-xl shadow-lg object-cover"
          />
          
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-6 py-6 text-white">
            <p className="text-sm font-grotesk">Account Balance</p>
            <h2 className="text-5xl font-bold">
              {showBalance ? "$2000" : "****"}
            </h2>
            <div className="flex justify-between w-full mt-2">
              <p className="text-sm">Total Deposit: <span className="font-semibold">$12000</span></p>
              <p className="text-sm">Earnings: <span className="font-semibold">$500</span></p>
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

        {/* Withdrawal Details */}
        <div className="text-center mt-6">
          <h2 className="text-3xl font-semibold text-[#00006D] font-grotesk mb-4">
            Confirm Your Withdrawal
          </h2>
          <p className="text-gray-600 text-sm">
            Review your withdrawal details carefully before confirming.
          </p>
        </div>

        {/* Withdrawal Summary */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md text-gray-800">
          <div className="flex justify-between text-sm">
            <p className="font-semibold">Amount Requested:</p>
            <span className="text-[#00006D]">$1000 USDT</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <p className="font-semibold">Transaction Fee (3%):</p>
            <span className="text-[#00006D]">$30 USDT</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <p className="font-semibold">Final Amount Sent:</p>
            <span className="text-[#00006D]">$970 USDT</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <p className="font-semibold">Processing Time:</p>
            <span className="text-[#00006D]">Estimated 10-30 minutes</span>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md text-[#00006D] text-center">
          <p className="text-sm font-semibold font-grotesk">Wallet Address</p>
          <p className="text-xl font-mono break-all text-[#00006D]">{walletAddress}</p>
        </div>

        {/* Confirm Withdrawal Button */}
        <Link to="/investment-in-process">
        <button
          onClick={() => setShowModal(true)} // Show the modal
          className="w-full font-grotesk mt-6 bg-gradient-to-tr from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-xl font-semibold hover:bg-blue-700"
        >
          Confirm Withdrawal
        </button>
        </Link>
      </div>

      {/* Security Check Modal */}
      {showModal && <SecurityCheck onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default WithdrawalConfirm;
