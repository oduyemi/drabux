import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ConfirmDepositModal from "../components/ConfirmDeposit";


const Deposit = () => {
  const { user, token } = useAuth();
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const headers = { Authorization: `Bearer ${token}` };
  }, [user, token]);


  const [checked, setChecked] = useState({
    risk: false,
    terms: false,
    withdrawal: false,
    responsibility: false,
  });

  const toggleCheck = (key) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const allChecked = Object.values(checked).every(Boolean);
  const handleDeposit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://novunt.vercel.app/api/v1/transactions/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount), goal }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Deposit initiation failed.");
      }

      localStorage.setItem("depositInvoice", JSON.stringify(data));
      navigate("/confirm-deposit");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConfirmModal = () => {
    if (!amount || parseFloat(amount) < 10) {
      setError("Minimum deposit is 10 USDT");
      return;
    }
    setError("");
    setOpen(true);
  };

  return (
    <div className="min-h-screen lg:min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] ">
      <button className="absolute top-6 left-6 text-blue-600 hover:text-blue-800 transition">
        <FaArrowLeft size={24} />
      </button>

      <div className="bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] w-full max-w-md lg:max-w-2xl xl:max-w-3xl p-6 lg:p-12 rounded-xl shadow-lg text-center min-h-[600px] lg:min-h-[700px] flex flex-col justify-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 font-grotesk">Set Up Your Investment Goal</h2>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-gray-500 text-sm md:text-xl lg:text-xl font-grotesk text-left">Investment Goal</label>
            <input
              type="text"
              placeholder="e.g. Save for a Car"
              className="w-full border rounded-md p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-500 text-sm md:text-xl lg:text-xl font-grotesk text-left">Amount to Invest</label>
            <input
              type="number"
              placeholder="$1000"
              className="w-full border rounded-md p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between mt-6 gap-6">
          <div className="w-full">
            <label className="block text-gray-500 text-sm font-serif">Deposit Date</label>
            <input type="date" className="w-full border rounded-md p-3 mt-2 outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="w-full">
            <label className="block text-gray-500 text-sm font-serif">Expected Return</label>
            <input
              type="text"
              value="200%"
              className="w-full border rounded-md p-3 mt-2 text-center outline-none bg-gray-100"
              disabled
            />
          </div>
        </div>

        <div className="mt-6 text-left space-y-3 text-sm">
          {Object.keys(checked).map((key, index) => (
            <label key={index} className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked[key]}
                onChange={() => toggleCheck(key)}
                className="mt-1 accent-[#00006D]"
              />
              <span className="text-gray-700">
                {key === "risk"
                  ? "I understand this deposit carries potential risks, including market fluctuations."
                  : key === "terms"
                  ? "I have reviewed the deposit details and accept the terms."
                  : key === "withdrawal"
                  ? "I acknowledge that my invested funds cannot be withdrawn, and only the returns on investment (ROI) will be available for withdrawal."
                  : "I am depositing with my own discretion and accept full responsibility for my decision."}
              </span>
            </label>
          ))}
        </div>

        {error && <div className="text-red-500 mt-3">{error}</div>}

        <button
          onClick={handleOpenConfirmModal}
          disabled={!allChecked || loading}
          className={`w-full mt-6 py-3 rounded-md text-white font-semibold transition-all ${
            allChecked
              ? "bg-gradient-to-b from-[#0000FE] to-[#00006D] hover:text-gray-300"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Confirm & Deposit"}
        </button>

        <button className="w-full mt-3 py-3 rounded-md text-blue-600 font-semibold border border-blue-600 hover:bg-blue-200">
          Cancel
        </button>
      </div>
      <ConfirmDepositModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Deposit;
