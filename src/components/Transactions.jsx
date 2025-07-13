import React from 'react';
import rectangle from '../assets/Rectangle.png';
import { FaWallet } from 'react-icons/fa';

const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: "$100.00",
    status: "confirmed",
    date: "17/2/2025",
    time: "10:34 AM",
    transactionId: "564925374920",
  },

  {
    id: 2,
    type: "Deposit",
    amount: "$100.00",
    status: "pending",
    date: "18/2/2025",
    time: "11:45 AM",
    transactionId: "874925374920",
  },

  {
    id: 3,
    type: "Withdrawal",
    amount: "$50.00",
    status: "failed",
    date: "19/2/2025",
    time: "09:10 AM",
    transactionId: "984925374920",
  },
];

const Transactions = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image Container */}
      <div className="top-0 w-full h-[27vh] relative">
        <img
          src={rectangle}
          alt="background"
          className="absolute top-0 left-0 w-full h-[88%] object-contain md:object-cover lg:object-cover"
        />
   
        {/* Text Inside the Image Container */}
        <div className="absolute inset-0 flex items-center justify-center">
    <h2 className="text-2xl font-grotesk md:text-3xl font-semibold text-white text-center w-full max-w-[80%]">
      Transaction History
    </h2>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-4 space-y-4 relative md:hidden">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <FaWallet className="text-blue-600 text-2xl" />
              <div>
                <p className="text-sm font-semibold">{transaction.type}</p>
                <p className="text-xs text-gray-500">From Wallet</p>
                <p className="text-xs text-gray-400">Transaction ID:</p>
                <p className="text-xs text-gray-500">{transaction.transactionId}</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-right">
              <p className="text-lg font-bold">{transaction.amount}</p>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${
                  transaction.status === "confirmed"
                    ? "text-green-600 bg-green-100"
                    : transaction.status === "pending"
                    ? "text-yellow-600 bg-yellow-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {transaction.status}
              </span>
              <p className="text-xs text-gray-400">{transaction.date}</p>
              <p className="text-xs text-gray-400">{transaction.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table (Desktop) */}
      <div className="hidden md:block container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="text-center border-b">
                  <td className="p-3 flex items-center justify-center space-x-2">
                    <FaWallet className="text-blue-600 text-lg" />
                    <span>{transaction.type}</span>
                  </td>
                  <td className="p-3">{transaction.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === "confirmed"
                          ? "text-green-600 bg-green-100"
                          : transaction.status === "pending"
                          ? "text-yellow-600 bg-yellow-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">{transaction.time}</td>
                  <td className="p-3">{transaction.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Transactions;
