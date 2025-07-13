import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import usdtIcon from "../assets/usdt.png"; // Ensure this is the correct path
import { Link } from "react-router-dom";

const WithdrawModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(1000);
  const [walletAddress, setWalletAddress] = useState(
    "Ex64877565623656t6g675w8767gvgsscvztqfr7"
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg text-center">
        {/* Close Button (Top Left) */}
        <button className="absolute top-4 left-4 text-[#00006D] hover:bg-gray-300  rounded-full" onClick={onClose}>
          <FiX size={28} />
        </button>

        {/* Title & Description */}
        <h2 className="text-2xl font-extrabold text-[#00006D] font-grotesk">Withdraw USDT</h2>
        <p className="text-gray-500 text-sm mt-2 font-serif">
          Securely transfer USDT from your Drabux wallet. <br />
          The minimum withdrawal amount is 10 USDT, <br />
          and a 3% transaction fee applies.
        </p>

        {/* USDT Icon */}
        <img src={usdtIcon} alt="USDT" className="w-20 h-20 mx-auto mt-4" />

        {/* Input Field for Amount */}
        <p className="text-[#00006D] mt-4 font-serif">Enter Withdrawal Amount (Min: 10 USDT)</p>
        <input
          type="number"
          className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2 text-center text-xl font-bold text-[#00006D]"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Input Field for Wallet Address */}
        <p className="text-gray-600 mt-4 font-grotesk">Enter Wallet Address</p>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2 text-center text-sm text-gray-700"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />

        {/* Withdraw Button */}
        <Link to="/withdraw-usdt">
        <button
          className="bg-gradient-to-b from-[#0000FE] to-[#00006D] text-white rounded-lg py-3 px-6 mt-6 w-full text-lg font-semibold hover:text-gray-400"
          onClick={() => alert(`Withdrawing $${amount} to ${walletAddress}`)}
        >
          Proceed to Withdraw
        </button>
        </Link>
      </div>
    </div>
  );
};

export default WithdrawModal;
