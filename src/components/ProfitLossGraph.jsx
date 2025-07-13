import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", profit: 500, loss: 200 },
  { month: "Feb", profit: 700, loss: 300 },
  { month: "Mar", profit: 800, loss: 100 },
  { month: "Apr", profit: 600, loss: 400 },
  { month: "May", profit: 900, loss: 200 },
  { month: "Jun", profit: 1000, loss: 300 },
];

const ProfitLossGraph = () => {
  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-2">Profit & Loss</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#00C49F" strokeWidth={3} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="loss" stroke="#FF4444" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitLossGraph;
