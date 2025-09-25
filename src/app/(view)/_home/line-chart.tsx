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
import { useQuery } from "@tanstack/react-query";
import { getUserChartApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";

export default function ChartA() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["userGrowth"],
    queryFn: (): idk => getUserChartApi({ token }),
  });

  // transform the response into chart-friendly data
  const chartData =
    data?.data?.new_users?.map((u: idk, idx: number) => ({
      month: u.month,
      value: u.count, // new users
      metric: data?.data?.new_partners?.[idx]?.count ?? 0, // new partners
    })) || [];

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-64">
      <ChartContainer
        config={{
          value: {
            label: "New Users",
            color: "hsl(var(--chart-1))",
          },
          metric: {
            label: "New Partners",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
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
            <ChartTooltip content={<ChartTooltipContent />} />
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
