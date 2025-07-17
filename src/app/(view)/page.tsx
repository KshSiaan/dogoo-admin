import React from "react";

import { SectionCards } from "@/components/section-cards";
import { Card, CardContent } from "@/components/ui/card";
import ChartA from "./_home/line-chart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BanIcon, EyeIcon } from "lucide-react";
import ViewRecentUser from "./_home/view-recent-user";
import BanUser from "./_home/ban-user";
import ViewChallange from "./_home/view-challange";

export default function Page() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="">
          <Chart />
        </div>
        <RecentUsers />
        <RecentChallanges />
      </div>
    </div>
  );
}

const Chart = () => {
  return (
    <Card>
      <CardContent>
        <ChartA />
      </CardContent>
    </Card>
  );
};

const RecentUsers = () => {
  return (
    <section>
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Users</h3>
        <Button>View All</Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>JOINED</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>Liam Nickson</TableCell>
                  <TableCell>12 June 2025</TableCell>
                  <TableCell>
                    <Badge variant={"success"}>Active</Badge>
                  </TableCell>
                  <TableCell>
                    <ViewRecentUser />
                    <BanUser type="ban" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

const RecentChallanges = () => {
  return (
    <section>
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Challenges</h3>
        <Button>View All</Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CHALLANGES</TableHead>
                <TableHead>PARTICIPANTS</TableHead>
                <TableHead>END DATE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>Liam Nickson</TableCell>
                  <TableCell>245</TableCell>
                  <TableCell>12 June 2025</TableCell>
                  <TableCell>
                    <Badge variant={"success"}>Active</Badge>
                  </TableCell>
                  <TableCell>
                    <ViewChallange />
                    <BanUser type="ban" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};
