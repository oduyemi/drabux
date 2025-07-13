import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 2000 },
  { name: "Apr", total: 2780 },
  { name: "May", total: 1890 },
  { name: "Jun", total: 2390 },
  { name: "Jul", total: 3490 },
  { name: "Aug", total: 3000 },
  { name: "Sep", total: 3200 },
  { name: "Oct", total: 3100 },
  { name: "Nov", total: 2800 },
  { name: "Dec", total: 2900 },
];

const InvestmentGraph = () => {
  return (
    <div className="w-full card col-span-full bg-white p-4 shadow-lg rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Monthly Investment Trend
      </h3>
      <div className="card-body p-0">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6A3CBC" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#2563eb" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#F78F1E" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid for better visibility */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            {/* Tooltip with better styling */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.7)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => `$${value}`}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tickMargin={6}
              tick={{ fontSize: 12, fill: "#475569" }}
            />

            {/* Y-Axis */}
            <YAxis
              dataKey="total"
              stroke="#94a3b8"
              tickMargin={6}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12, fill: "#475569" }}
            />

            {/* Area Chart */}
            <Area
              type="monotone"
              dataKey="total"
              stroke="#6A3CBC"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTotal)"
              dot={{ stroke: "#6A3CBC", strokeWidth: 2, r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvestmentGraph;
