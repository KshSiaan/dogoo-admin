"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { month: "30- Day Fitness", activeUser: 12, blockedUser: 8 },
  { month: "Morning Routine", activeUser: 39, blockedUser: 10 },
  { month: "No Sugar", activeUser: 28, blockedUser: 9 },
  { month: "Reading", activeUser: 4, blockedUser: 10 },
  { month: "Meditation", activeUser: 32, blockedUser: 9 },
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

export default function ChartC() {
  return (
    <div className="w-full p-4 mt-6">
      <div className="mb-6">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-semibold">Top Challenges</h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last 7 Days</SelectItem>
              <SelectItem value="2">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
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
            <Bar dataKey="activeUser" radius={[2, 2, 0, 0]} maxBarSize={40}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    // you can define logic here, or use a color list
                    index === 0
                      ? "#2A9D90"
                      : index === 1
                      ? "#E76E50"
                      : index === 2
                      ? "#526C76"
                      : index === 3
                      ? "#E8C468"
                      : "#F4A462"
                  }
                />
              ))}
            </Bar>

            {/* <Bar
              dataKey="blockedUser"
              fill="var(--color-blockedUser)"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            /> */}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
