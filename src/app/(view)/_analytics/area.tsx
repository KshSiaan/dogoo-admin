"use client";

import {
  AreaChart,
  Area,
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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getGroupChartApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { idk } from "@/lib/utils";

const chartConfig = {
  challenge_start: {
    label: "Challenge Starts",
    color: "#14b8a6",
  },
  challenge_completion: {
    label: "Challenge Completions",
    color: "#f87171",
  },
};

export default function ChartB() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["group_chart"],
    queryFn: (): idk => getGroupChartApi({ token }),
  });

  // transform API data into chart-ready format
  const chartData =
    data?.data?.challenge_start?.map((start: idk, idx: number) => ({
      month: start.month,
      challenge_start: start.count,
      challenge_completion: data?.data?.challenge_completion?.[idx]?.count ?? 0,
    })) || [];

  if (isPending) {
    return <Skeleton className="w-full aspect-video" />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl">Group Engagement</CardTitle>
        {/* <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select> */}
      </CardHeader>

      <div className="my-6">
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

      <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
            <Area
              type="monotone"
              dataKey="challenge_start"
              stroke="#14b8a6"
              fill="rgba(20, 184, 166, 0.2)"
              strokeWidth={2}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="challenge_completion"
              stroke="#f87171"
              fill="rgba(248, 113, 113, 0.2)"
              strokeWidth={2}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
