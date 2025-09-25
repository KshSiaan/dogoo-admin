import React from "react";
import { SectionCards } from "@/components/section-cards";
import { cookies } from "next/headers";
import ChartC from "./_analytics/bar-chart";
import ChartB from "./_analytics/area";
import ChartAC from "./_analytics/chart-a";
import ChartBC from "./_analytics/areaB";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return null;
  }
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="">
          <ChartAC />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <ChartB />
          <ChartC />
          <div className="col-span-2">
            <ChartBC />
          </div>
        </div>
      </div>
    </div>
  );
}
