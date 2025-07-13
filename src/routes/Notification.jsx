import React from "react";
import { motion } from "framer-motion";

const notifications = [
  {
    id: 1,
    title: "Weekly Profit Alert.",
    message: "Your weekly profit has been credited: $50.",
    date: "17/2/2025",
    time: "10:34 AM",
    category: "Recent Notifications",
  },
  {
    id: 2,
    title: "Withdraw Success Update.",
    message: "Your withdrawal of $500 has been credited to wallet.",
    date: "17/2/2025",
    time: "10:34 AM",
    category: "Transaction Updates",
  },
  {
    id: 3,
    title: "Goals Alert.",
    message: "50% of your investment goal reached!",
    date: "8/2/2025",
    time: "9:18 AM",
    category: "Recent Notifications",
  },
  {
    id: 4,
    title: "Reminder.",
    message: "Withdrawals under $100 are subject to a fee of 2%.",
    date: "7/2/2025",
    time: "8:01 AM",
    category: "System Alerts",
  },
  {
    id: 5,
    title: "Investment Success Update.",
    message: "Your investment of $1000 has been activated!",
    date: "3/2/2025",
    time: "10:34 AM",
    category: "Transaction Updates",
  },
];

const NotificationSection = ({ title, notifications }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <h3 className="text-lg font-semibold text-blue-600 mb-2">{title}</h3>
      {notifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.02 }}
          className="border-b py-2 last:border-none"
        >
          <h4 className="text-sm font-medium text-gray-700">{notification.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>{notification.date} - {notification.time}</span>
            <motion.span whileHover={{ scale: 1.1 }} className="text-blue-600 cursor-pointer">
              View &gt;
            </motion.span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const NotificationPage = () => {
  const sections = ["Recent Notifications", "Transaction Updates", "System Alerts"];
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">Notifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {sections.map((section) => (
          <NotificationSection
            key={section}
            title={section}
            notifications={notifications.filter((n) => n.category === section)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
