"use client";

import { PieChart, Pie } from "recharts";
import {
  ChartConfig,
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
  { browser: "chrome", visitors: 75, fill: "#E76E50" },
  { browser: "safari", visitors: 200, fill: "#14b8a6" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ChartDs() {
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
        <div className="mb-6">
          <div className="flex justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-12 h-2 bg-[#14b8a6] rounded"></div>
              <span>Challenge Starts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-2 bg-[#f87171] rounded"></div>
              <span>Challenge Completions</span>
            </div>
          </div>
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
