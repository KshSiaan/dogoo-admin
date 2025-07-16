"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "Jan", value: 40, metric: 330 },
  { month: "Feb", value: 60, metric: 60 },
  { month: "Mar", value: 130, metric: 65 },
  { month: "Apr", value: 160, metric: 355 },
  { month: "May", value: 190, metric: 400 },
  { month: "Jun", value: 220, metric: 225 },
  { month: "Jul", value: 260, metric: 48 },
  { month: "Aug", value: 240, metric: 52 },
  { month: "Sep", value: 220, metric: 58 },
  { month: "Oct", value: 160, metric: 62 },
  { month: "Nov", value: 120, metric: 67 },
  { month: "Dec", value: 140, metric: 70 },
];

export default function ChartA() {
  return (
    <div className="w-full h-64">
      <ChartContainer
        config={{
          value: {
            label: "Value",
            color: "hsl(var(--chart-1))",
          },
          metric: {
            label: "Metric",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              horizontal={true}
              vertical={false}
            />
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
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="metric"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
