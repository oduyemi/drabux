import React, { useState } from "react";
import Rectangle from "../assets/Rectangle.png";
import deposit from "../assets/deposit.png";
import withdraw from "../assets/withdraw.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import DepositModal from "../Modals/DepositModal"; // Import Deposit Modal
import WithdrawModal from "../Modals/WithdrawModal"; // Import Withdraw Modal

const Account = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    return (
        <div className="relative">
            <section
                className="relative mx-auto mt-2 flex h-80 w-full flex-col justify-between rounded-2xl p-4 text-white shadow-md"
                style={{
                    backgroundImage: `url(${Rectangle})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Account Balance Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Account Balance</h3>
                </div>

                {/* Balance Amount, Eye Icon & DLP */}
                <div className="mb-4 flex w-full items-center justify-between">
                    {/* Total Balance with Eye Icon */}
                    <div className="flex items-center space-x-2">
                        <p className="text-4xl font-extrabold">{showBalance ? "$2,000" : "****"}</p>
                        <button onClick={() => setShowBalance(!showBalance)} className="text-white">
                            {showBalance ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                        </button>
                    </div>

                    {/* Drabux Legacy Point (DLP) */}
                    <div className="rounded-lg bg-gradient-to-r from-[#00006D] to-[#0000D3] px-4 py-2 text-sm font-semibold text-white shadow">
                        Drabux Legacy Point: <span className="font-bold">1250 DLP</span>
                    </div>
                </div>

                {/* Deposit & Spending Details */}
                <div className="mb-4 grid w-full grid-cols-3 items-center text-sm opacity-90">
                    {/* Total Deposit */}
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold">Total Deposit</span>
                        <span className="text-lg font-bold">$12,000</span>
                    </div>

                    {/* Vertical Dashed Line */}
                    <div className="flex h-full justify-center">
                        <div className="h-10 border-l-2 border-dashed border-gray-400"></div>
                    </div>

                    {/* Earnings */}
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold">Earnings</span>
                        <span className="text-lg font-bold">$500</span>
                    </div>
                </div>

                {/* Deposit & Withdraw Buttons */}
                <div className="mb-20 ml-2 flex w-full items-center justify-between">
                    <button
                        onClick={() => setIsDepositOpen(true)}
                        className="flex items-center rounded-lg bg-gradient-to-r from-[#00006D] to-[#0000D3] px-6 py-2 text-white"
                    >
                        Deposit
                        <img src={deposit} alt="Deposit" className="ml-2 h-5 w-5 text-white" />
                    </button>
                    <button
                        onClick={() => setIsWithdrawOpen(true)}
                        className="flex items-center rounded-lg bg-gradient-to-r from-[#00006D] to-[#0000D3] px-6 py-2 shadow"
                    >
                        Withdraw
                        <img src={withdraw} alt="Withdraw" className="ml-2 h-5 w-5 text-white" />
                    </button>
                </div>
            </section>

            {/* Modals */}
            <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
            <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
        </div>
    );
};

export default Account;
