import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BanIcon, EyeIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ViewChallange from "./view-challange";
import DeleteChallange from "./delete-challange";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>All Challenges</CardTitle>
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
            <Users />
          </CardContent>
        </Card>
        <div className="mt-4 text-sm font-medium flex items-center justify-between w-full">
          <p>Showing 1 to 5 of 112 entries </p>
          <div className="">
            <Pagination className="w-fit ">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  );
}

const Users = () => {
  return (
    <>
      <Tabs defaultValue={"active"} className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active Challanges</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed Challenges</TabsTrigger>
        </TabsList>
      </Tabs>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>CHALLENGE NAME</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
            <TableHead>PARTICIPANTS</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1001}</TableCell>
              <TableCell>Liam Nickson</TableCell>
              <TableCell>Health</TableCell>
              <TableCell>12 June 2025</TableCell>
              <TableCell>12 June 2025</TableCell>
              <TableCell>
                <Badge variant={"success"}>Active</Badge>
              </TableCell>
              <TableCell>
                <ViewChallange />
                <DeleteChallange />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
