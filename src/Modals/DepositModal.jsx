import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import usdtIcon from "../assets/usdt.png";
import { Link } from "react-router-dom";

const DepositModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState(1000);

    if (!isOpen) return null;

    return (
        <div className="fixed w-full p-4 inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
            <div className="relative bg-white rounded-2xl p-6 text-center w-96 shadow-lg border border-blue-200">
                {/* Close Button */}
                <button className="absolute top-4 left-4 text-[#00006D] hover:bg-gray-300  rounded-full" onClick={onClose}>
                    <FiX size={24} />
                </button>

                {/* Title & Description */}
                <h2 className="text-xl font-bold text-[#00006D] font-grotesk mt-2">Deposit USDT</h2>
                <p className="text-gray-500 text-sm mt-2 font-serif">
                    Securely fund your Drabux wallet with USDT. The minimum deposit amount is 10 USDT, and there are no transaction fees.
                </p>

                {/* USDT Icon */}
                <img src={usdtIcon} alt="USDT" className="w-20 h-20 mx-auto mt-4" />

                {/* Input Field */}
                <p className="text-[#00006D] mt-4 font-serif">Enter Deposit Amount (Min: 10 USDT)</p>
                <input
                    type="number"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2 text-center text-lg font-semibold"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {/* Deposit Button */}
                <Link to="/confirm-deposit">
                <button
                    className="bg-gradient-to-b from-[#0000FE] to-[#00006D] hover:text-gray-400 text-white rounded-lg py-3 px-6 mt-6 w-full text-lg font-semibold font-grotesk"
                    onClick={() => alert(`Depositing $${amount}`)}
                >
                    Proceed to Deposit
                </button>
                </Link>
            </div>
        </div>
    );
};

export default DepositModal;
