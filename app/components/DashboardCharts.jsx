"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function DashboardCharts({ categoryData, priceData }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
      {/* ================= CATEGORY CHART ================= */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Products by Category
            </h2>

            <p className="text-gray-500 mt-1">
              Number of products available in each category
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded-xl text-2xl">📦</div>
        </div>

        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="indigoGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />

            <XAxis type="number" tickLine={false} axisLine={false} />

            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={100}
            />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0px 10px 25px rgba(0,0,0,.15)",
              }}
            />

            <Bar
              dataKey="products"
              fill="url(#indigoGradient)"
              radius={[0, 12, 12, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PRICE CHART ================= */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Product Price Distribution
            </h2>

            <p className="text-gray-500 mt-1">
              Products grouped by price range
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-2xl">💰</div>
        </div>

        <ResponsiveContainer width="100%" height={380}>
          <AreaChart
            data={priceData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="name" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0px 10px 25px rgba(0,0,0,.15)",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={4}
              fill="url(#greenGradient)"
              animationDuration={1700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
