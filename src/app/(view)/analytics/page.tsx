import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartB from "./area";
import ChartC from "./bar-chart";
import ChartDs from "./pie";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>Analytics & Reports</CardTitle>
            <div
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-fit min-w-0 rounded-md border bg-transparent px-3 items-center text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
            >
              <SearchIcon className="text-muted-foreground" />
              <Input
                className="outline-none! border-none! ring-0! shadow-none! py-0"
                placeholder="Search.."
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={"active"} className="mb-6">
              <TabsList>
                <TabsTrigger value="active">User Analytics</TabsTrigger>
                <TabsTrigger value="upcoming">Challenge Analytics</TabsTrigger>
                <TabsTrigger value="upcomings">Revenue Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <div className="mb-6 mt-6">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl font-semibold">User Engagement</h3>
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
                  <ChartB />
                </div>
                <Users />
              </TabsContent>
              <TabsContent value="upcoming">
                <div className="mb-6">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl font-semibold">User Engagement</h3>
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
                  <ChartB />
                </div>
                <ChartC />
              </TabsContent>
              <TabsContent value="upcomings">
                <ChartDs />
                <div className="mb-6">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl font-semibold">User Engagement</h3>
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
                  <ChartB />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const Users = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>METRIC</TableHead>
            <TableHead>TODAY</TableHead>
            <TableHead>THIS WEEK</TableHead>
            <TableHead>THIS MONTH</TableHead>
            <TableHead>ALL TIME</TableHead>
            <TableHead>CHANGE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>New Users</TableCell>
            <TableCell>24</TableCell>
            <TableCell>156</TableCell>
            <TableCell>432</TableCell>
            <TableCell>1,284</TableCell>
            <TableCell>12.5%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Active Users</TableCell>
            <TableCell>24</TableCell>
            <TableCell>156</TableCell>
            <TableCell>432</TableCell>
            <TableCell>1,284</TableCell>
            <TableCell>12.5%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Premium Conversions</TableCell>
            <TableCell>24</TableCell>
            <TableCell>156</TableCell>
            <TableCell>432</TableCell>
            <TableCell>1,284</TableCell>
            <TableCell>12.5%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Avg. Session Duration</TableCell>
            <TableCell>4.2 mins</TableCell>
            <TableCell>5.1 min</TableCell>
            <TableCell>4.8 min</TableCell>
            <TableCell>4.5 min</TableCell>
            <TableCell>12.5%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
