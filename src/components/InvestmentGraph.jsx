import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../contexts/AuthContext"; // ensure this gives you `user._id`

const InvestmentGraph = () => {
  const { user } = useAuth();
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(
          `https://novunt.vercel.app/api/v1/transactions/stakes/history/${user._id}`
        );
        const data = await res.json();

        if (!res.ok || !data.stakes) {
          console.error("Error fetching investment data:", data?.message);
          return;
        }

        // Aggregate monthly totals
        const monthlyTotals = {};
        data.stakes.forEach((stake) => {
          const date = new Date(stake.createdAt);
          const month = date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
          monthlyTotals[month] = (monthlyTotals[month] || 0) + stake.amount;
        });

        // Prepare data for chart
        const allMonths = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedData = allMonths.map((month) => ({
          name: month,
          total: monthlyTotals[month] || 0,
        }));

        setGraphData(formattedData);
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchInvestmentData();
  }, [user]);

  return (
    <div className="col-span-full w-full rounded-3xl bg-white px-6 py-5 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl dark:bg-[#0e0f1a] dark:ring-0 dark:text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
          📈 Monthly Investment Trend
        </h3>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Live Overview</span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={graphData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6A3CBC" stopOpacity={0.9} />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#F78F1E" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              border: "none",
              borderRadius: "0.5rem",
              color: "#fff",
              fontSize: "14px",
            }}
            formatter={(value) => [`$${value.toLocaleString()}`, "Invested"]}
          />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#6A3CBC"
            strokeWidth={3}
            fill="url(#colorTotal)"
            dot={{ stroke: "#6A3CBC", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#6A3CBC", strokeWidth: 3, fill: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentGraph;
