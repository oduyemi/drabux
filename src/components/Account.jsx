import React, { useEffect, useState } from "react";
import Rectangle from "../assets/Rectangle.png";
import deposit from "../assets/deposit.png";
import withdraw from "../assets/withdraw.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import DepositModal from "../Modals/DepositModal";
import WithdrawModal from "../Modals/WithdrawModal";
import { useAuth } from "../contexts/AuthContext"; 

const Account = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const [wallet, setWallet] = useState({
    balance: 0,
    totalDeposited: 0,
    totalWithdrawn: 0,
    dlp: 1250, // Placeholder
  });

//   const earnings = wallet.balance + wallet.totalWithdrawn - wallet.totalDeposited;
    const earnings = Math.max(
    (wallet?.balance || 0) + (wallet?.totalWithdrawn || 0) - (wallet?.totalDeposited || 0),
    0
    );

    useEffect(() => {
        const fetchWallet = async () => {
        try {
            const res = await fetch(`https://novunt.vercel.app/api/v1/wallets/${user?.userID}`, {
            headers: {
                "Content-Type": "application/json",
            },
            });
            
            const data = await res.json();
            if (res.ok && data) {
            const w = data.wallet || data.data?.wallet || {};
            setWallet({
                balance: w.balance || 0,
                totalDeposited: w.totalDeposited || 0,
                totalWithdrawn: w.totalWithdrawn || 0,
                dlp: 1250,
            });
            } else {
            console.error("Wallet fetch failed:", data?.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching wallet:", error);
        }
        };

        if (user?.userID) fetchWallet();
    }, [user]);

    return (
    <div className="relative">
      <section
        className="relative mx-auto mt-6 flex h-80 w-full flex-col justify-between rounded-3xl bg-cover bg-center p-6 text-white shadow-xl transition-all md:h-72"
        style={{ backgroundImage: `url(${Rectangle})` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">Account Balance</h3>
        </div>

        {/* Balance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-4xl font-extrabold tracking-tight">
              {showBalance ? `$${wallet.balance.toLocaleString()}` : "••••"}
            </p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="transition hover:scale-105"
            >
              {showBalance ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="rounded-xl bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md">
            DLP: <span className="font-bold">{wallet.dlp}</span>
          </div>
        </div>

        {/* Deposit & Earnings Summary */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm font-medium opacity-95">
          <div className="space-y-1">
            <p className="text-xs tracking-wide">Total Deposit</p>
            <p className="text-lg font-semibold">${wallet.totalDeposited.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-10 w-px border-l-2 border-dashed border-white/50"></div>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">
                ${earnings >= 0 ? earnings.toLocaleString() : 0}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsDepositOpen(true)}
            className="flex items-center justify-center rounded-xl bg-white/20 px-6 py-2 text-sm font-semibold shadow hover:bg-white/30 backdrop-blur-md transition"
          >
            Deposit
            <img src={deposit} alt="Deposit" className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="flex items-center justify-center rounded-xl bg-white/20 px-6 py-2 text-sm font-semibold shadow hover:bg-white/30 backdrop-blur-md transition"
          >
            Withdraw
            <img src={withdraw} alt="Withdraw" className="ml-2 h-4 w-4" />
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
