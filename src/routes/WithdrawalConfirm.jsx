import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const WithdrawalConfirm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      {/* Back Button */}
      <div className="w-full max-w-md">
        <button className="flex items-center text-gray-600 text-sm mb-4">
          <FaArrowLeft className="mr-2" />
          Withdraw Confirm
        </button>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Account Balance Section */}
        <div className="relative bg-blue-700 text-white rounded-xl p-4">
          <p className="text-sm">Account Balance</p>
          <h2 className="text-4xl font-bold">$2000</h2>
          <div className="flex justify-between text-xs mt-2">
            <p>Total Deposit: <span className="font-semibold">$12000</span></p>
            <p>Bonuses: <span className="font-semibold">$500</span></p>
          </div>
          <div className="absolute top-2 right-2 bg-white text-blue-700 px-3 py-1 rounded-md text-xs font-bold">
            1250 DLP
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="text-center mt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Your Withdrawal
          </h2>
          <p className="text-gray-500 text-sm">
            Review your withdrawal details carefully before confirming
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="mt-4 text-sm text-gray-700">
          <div className="flex justify-between py-1 border-b">
            <span>Amount Requested</span>
            <span className="font-semibold text-blue-700">$1000 USDT</span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span>Transaction Fee (3%)</span>
            <span className="font-semibold text-blue-700">$30 USDT</span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span>Final Amount Sent</span>
            <span className="font-semibold text-blue-700">$970 USDT</span>
          </div>
          <div className="flex justify-between py-1 border-b">
            <span>Processing Time</span>
            <span className="font-semibold text-blue-700">Estimated 10-30 minutes</span>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">Wallet Address</p>
          <p className="text-gray-800 font-mono text-sm break-all">
            Ex648775658623656t6g75w8767vgvsscvtqf7
          </p>
        </div>

        {/* Confirm Button */}
        <button className="w-full mt-6 bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold">
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
};

export default WithdrawalConfirm;
