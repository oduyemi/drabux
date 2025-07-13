import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Footer } from "@/layouts/footer";
import { DollarSign, Package, TrendingUp, Wallet } from "lucide-react";
import InvestmentGraph from "../../components/InvestmentGraph";
import Account from "../../components/Account.jsx";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, token } = useAuth();
  const [stakes, setStakes] = useState([]);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);

  useEffect(() => {
    if (!user) return;
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch Stakes
    fetch(`https://novunt.vercel.app/api/v1/transactions/stakes/history/${user.userID}`, { headers })
      .then(res => res.json())
      .then(({ stakes = [] }) => {
        setStakes(stakes);
        const invested = stakes.filter(s => !s.isBonus).reduce((sum, s) => sum + s.amount, 0);
        const bonus = stakes.filter(s => s.isBonus).reduce((sum, s) => sum + s.roiAmount, 0);
        setTotalInvestments(invested);
        setTotalBonus(bonus);
      })
      .catch(console.error);

    // Fetch Withdrawals
    fetch(`https://novunt.vercel.app/api/v1/withdrawals/my-withdrawals`, { headers })
      .then(res => res.json())
      .then(({ withdrawals = [] }) => {
        const total = withdrawals.reduce((sum, w) => sum + w.amount, 0);
        setTotalWithdrawal(total);
      })
      .catch(console.error);
  }, [user, token]);

  return (
    <div className="flex flex-col gap-y-6 px-4 py-6 md:px-10 font-sans text-[#1a1a1a] bg-[#f5f6fa]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            icon: <Package size={26} />,
            title: "Total Investments",
            amount: `$${totalInvestments.toLocaleString()}`,
          },
          {
            icon: <DollarSign size={26} />,
            title: "Total Withdrawals",
            amount: `$${totalWithdrawal.toLocaleString()}`,
          },
          {
            icon: <Wallet size={26} />,
            title: "Total Bonus",
            amount: `$${totalBonus.toLocaleString()}`,
          },
        ].map((card, idx) => (
          <div key={idx} className="rounded-2xl bg-white shadow-md p-6 transition hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-blue-500/10 p-3 text-blue-600">{card.icon}</div>
              <p className="text-sm font-semibold text-gray-500">{card.title}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-900">{card.amount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Account Overview */}
      <Account />

      {/* Investment Graph */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-7">
        <InvestmentGraph />
      </div>

      {/* Investment History */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#00006D]">
          Investment History
        </h2>

        {stakes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
            <p className="text-lg text-gray-500">
              You haven't made any investments yet.
            </p>
            <Link
              to="/stake"
              className="rounded-lg bg-[#00006D] px-6 py-2 text-white font-semibold hover:bg-blue-800 transition"
            >
              Stake Funds
            </Link>
          </div>
        ) : (
          <div className="space-y-6 overflow-y-auto max-h-[700px]">
            {stakes
              .filter((s) => !s.isBonus)
              .map((investment, index) => {
                const createdDate = new Date(investment.createdAt).toLocaleDateString();
                const progress = investment.roiPaid ? 100 : 50;
                const status = investment.roiPaid
                  ? "Completed"
                  : new Date(investment.maturityDate) <= new Date()
                  ? "Pending ROI"
                  : "Active";

                const statusColor =
                  status === "Active"
                    ? "bg-green-500"
                    : status === "Pending ROI"
                    ? "bg-yellow-500"
                    : "bg-blue-500";

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 bg-[#fdfdfd] p-4 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-lg font-semibold">
                          🎯 Investment Goal #{index + 1}
                        </h4>
                        <p className="text-sm text-gray-500">Date: {createdDate}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Status:</span>
                          <span className={`h-3 w-3 rounded-full ${statusColor}`} />
                          <span className="text-sm">{status}</span>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-md font-medium text-gray-700">
                          Initial Deposit:
                          <span className="ml-1 font-bold text-blue-600">
                            ${investment.amount}
                          </span>
                        </p>
                        <p className="text-sm text-blue-500 font-semibold">
                          ROI: ${investment.roiAmount}
                        </p>
                        <p className="text-sm text-gray-500">
                          Matures: {new Date(investment.maturityDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-600 relative"
                        style={{ width: `${progress}%` }}
                      >
                        <span
                          className={`absolute -top-5 right-0 text-xs font-bold ${
                            progress < 15 ? "text-black" : "text-white"
                          }`}
                        >
                          {progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
