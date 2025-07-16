"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", activeUser: 37, blockedUser: 8 },
  { month: "Feb", activeUser: 39, blockedUser: 10 },
  { month: "Mar", activeUser: 38, blockedUser: 9 },
  { month: "Apr", activeUser: 40, blockedUser: 10 },
  { month: "May", activeUser: 38, blockedUser: 9 },
  { month: "Jun", activeUser: 37, blockedUser: 9 },
  { month: "Jul", activeUser: 39, blockedUser: 10 },
  { month: "Aug", activeUser: 38, blockedUser: 9 },
  { month: "Sep", activeUser: 37, blockedUser: 9 },
  { month: "Oct", activeUser: 38, blockedUser: 10 },
  { month: "Nov", activeUser: 37, blockedUser: 9 },
  { month: "Dec", activeUser: 38, blockedUser: 10 },
];

const chartConfig = {
  activeUser: {
    label: "Active User",
    color: "#14b8a6",
  },
  blockedUser: {
    label: "Blocked User",
    color: "#f87171",
  },
};

export default function ChartB() {
  return (
    <div className="w-full p-4 mt-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">User Activity Overview</h2>
        <div className="flex justify-center items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-12 h-4 bg-[#14b8a6] rounded"></div>
            <span>Active User</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-4 bg-[#f87171] rounded"></div>
            <span>Blocked User</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              domain={[0, 45]}
              ticks={[0, 10, 20, 30, 40]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Bar
              dataKey="activeUser"
              fill="var(--color-activeUser)"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="blockedUser"
              fill="var(--color-blockedUser)"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
