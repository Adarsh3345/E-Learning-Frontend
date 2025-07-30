import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 80 },
  { month: "Mar", users: 60 },
  { month: "Apr", users: 120 },
  { month: "May", users: 90 },
  { month: "Jun", users: 150 },
];

const BarChartCard = () => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-5 w-full max-w-2xl transition-all duration-300 hover:shadow-xl mt-3">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white tracking-wide">
        📈 Monthly Growth
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#cbd5e1" }}
          />
          <Bar
            dataKey="users"
            fill="#bf92e4"
            radius={[6, 6, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
