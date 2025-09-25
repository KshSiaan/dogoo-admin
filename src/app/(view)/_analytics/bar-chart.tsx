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
import { Card, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getTopChallengeChartApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { idk } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  activeUser: {
    label: "Completed Count",
    color: "#14b8a6",
  },
};

export default function ChartC() {
  const [{ token }] = useCookies(["token"]);
  const [filter, setFilter] = useState<idk>("30");

  const { data, isPending } = useQuery({
    queryKey: ["top_challenges", filter],
    queryFn: (): idk => getTopChallengeChartApi({ filter, token }),
  });

  // transform API response
  const chartData =
    data?.data?.data?.map((item: idk) => ({
      month: item.habit_name,
      activeUser: item.completed_count,
    })) || [];
  if (isPending) {
    <Skeleton className="w-full aspect-video" />;
  }
  return (
    <Card className="w-full">
      <CardHeader className="mb-6">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-semibold">Top Challenges</h3>
          <Select
            value={filter}
            onValueChange={(e) => {
              setFilter(e);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="15">Last 15 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Bar dataKey="activeUser" radius={[2, 2, 0, 0]} maxBarSize={40}>
              {chartData.map((entry: idk, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
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
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
