import React, { useEffect, useState } from "react";
import rectangle from "../assets/Rectangle.png";
import { FaWallet } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const getStatusStyles = (status) => {
  const base = "text-xs font-semibold px-3 py-1 rounded-full capitalize";
  switch (status) {
    case "confirmed":
      return `${base} text-green-600 bg-green-100`;
    case "pending":
      return `${base} text-yellow-600 bg-yellow-100`;
    case "failed":
      return `${base} text-red-600 bg-red-100`;
    default:
      return base;
  }
};

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return {
    date: date.toLocaleDateString(undefined, options),
    time,
  };
};

const Transactions = () => {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          "https://novunt.vercel.app/api/v1/transactions/my-transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setTransactions(data.transactions || []);
        } else {
          console.error("Error fetching transactions:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa]">
      {/* Top Banner */}
      <div className="relative h-[28vh] w-full overflow-hidden">
        <img
          src={rectangle}
          alt="background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Transaction History
          </h1>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center flex-1 py-20 text-gray-500">
          Loading transactions...
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-500 py-10 font-medium text-lg">
          <p>No transactions yet. Start investing or depositing to see them here.</p>
          <div className="w-full text-center my-10">
            <Link
              to="/app/invest"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white text-sm md:text-base font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Stake Funds Now
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile View */}
          <div className="w-full max-w-lg mx-auto px-4 py-6 space-y-5 md:hidden">
            {transactions.map((tx) => {
              const { date, time } = formatDateTime(tx.createdAt);
              return (
                <div
                  key={tx._id || tx.transactionId}
                  className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-start hover:shadow-lg transition"
                >
                  <div className="flex items-start gap-3">
                    <FaWallet className="text-blue-600 text-xl mt-1" />
                    <div>
                      <p className="text-base font-semibold">{tx.type}</p>
                      <p className="text-sm text-gray-500">From Wallet</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Transaction ID:{" "}
                        <span className="text-gray-600">{tx.transactionId}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-base font-bold text-gray-900">
                      ${tx.amount.toLocaleString()}
                    </p>
                    <span className={getStatusStyles(tx.status)}>{tx.status}</span>
                    <p className="text-xs text-gray-500">{date}</p>
                    <p className="text-xs text-gray-500">{time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block max-w-6xl mx-auto py-8 px-6">
            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600 text-left text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => {
                    const { date, time } = formatDateTime(tx.createdAt);
                    return (
                      <tr
                        key={tx._id || tx.transactionId}
                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-6 py-4 flex items-center gap-2 font-medium">
                          <FaWallet className="text-blue-500" />
                          {tx.type}
                        </td>
                        <td className="px-6 py-4 font-bold">
                          ${tx.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={getStatusStyles(tx.status)}>{tx.status}</span>
                        </td>
                        <td className="px-6 py-4">{date}</td>
                        <td className="px-6 py-4">{time}</td>
                        <td className="px-6 py-4 text-gray-600">{tx.transactionId}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
