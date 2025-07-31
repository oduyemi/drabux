import React, { useEffect, useState } from "react";
import { FaRegCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import cardImage from "../assets/rectangle-img.png";

const DepositConfirm = ({ isOpen, onClose, depositData, userId }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const walletAddress = depositData?.walletAddress || wallet?.walletAddress || "Unavailable";
  const amountToDeposit = depositData?.amount || 0;

  useEffect(() => {
    if (userId && isOpen) {
      fetch(`/wallets/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setWallet(data.wallet);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load wallet:", err);
          setLoading(false);
        });
    }
  }, [userId, isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh] animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header with image and balance */}
        <div className="relative rounded-t-2xl overflow-hidden">
          <img src={cardImage} alt="Deposit Visual" className="w-full h-[220px] object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center text-white px-6 py-4">
            <p className="text-sm font-medium">Account Balance</p>
            <h2 className="text-4xl font-bold mb-2">
              {showBalance ? `$${wallet?.balance?.toFixed(2) || 0}` : "****"}
            </h2>
            <p className="text-sm">
              Total Deposit: <span className="font-semibold">${wallet?.totalDeposited?.toFixed(2) || 0}</span> | Earnings:{" "}
              <span className="font-semibold">
                ${((wallet?.balance || 0) - (wallet?.totalDeposited || 0)).toFixed(2)}
              </span>
            </p>

            <button
              onClick={() => setShowBalance(!showBalance)}
              className="absolute bottom-4 right-4 text-white hover:text-gray-300"
              aria-label="Toggle balance visibility"
            >
              {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>

            <div className="absolute top-4 right-4 bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
              1250 DLP
            </div>
          </div>
        </div>

        {/* Deposit instructions */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#00006D] mb-1">Your USDT Deposit Address</h3>
            <p className="text-gray-700 text-sm">
              Send exactly{" "}
              <span className="font-semibold text-black">${amountToDeposit} USDT</span> to the wallet address below. <br />
              Ensure you meet the minimum of <strong>10 USDT</strong>.
            </p>
          </div>

          <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg shadow-sm">
            <span className="text-sm font-mono break-all">{walletAddress}</span>
            <button
              onClick={copyToClipboard}
              className="text-blue-700 hover:text-blue-500"
              aria-label="Copy address"
            >
              <FaRegCopy size={20} />
            </button>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full bg-gradient-to-r from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition"
          >
            {copied ? "Copied!" : "Copy Address"}
          </button>

          <div className="bg-blue-50 text-center px-4 py-3 rounded-lg text-sm text-blue-700 shadow">
            <p className="font-semibold">No Transaction Fees</p>
            <p className="text-xs">Your full deposit will be credited</p>
          </div>

          <Link to="/app/deposit-process">
            <button className="w-full bg-gradient-to-r from-[#0000FE] to-[#00006D] text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition">
              I've Deposited
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepositConfirm;
