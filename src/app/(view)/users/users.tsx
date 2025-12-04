"use client";
import { Loader2Icon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn, idk } from "@/lib/utils";
import { getUsersApi } from "@/lib/api/admin";
import { dateExtractor } from "@/lib/functions";
import DetailsButton from "./details-button";
import UserBlocker from "./user-blocker";

export default function Users() {
  const [{ token }] = useCookies(["token"]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["users", search, page],
    queryFn: (): idk => getUsersApi({ search, token, page }),
  });

  const users = data?.data?.data || [];
  const pagination = data?.data;

  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>All Users</CardTitle>
        <div
          className={cn(
            "flex h-9 w-fit items-center rounded-md border px-3",
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "shadow-xs transition-[color,box-shadow] outline-none md:text-sm"
          )}
        >
          <SearchIcon className="text-muted-foreground mr-2" />
          <Input
            className="outline-none! border-none! ring-0! shadow-none! py-0"
            placeholder="Search.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to page 1 on search
            }}
          />
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>ID</TableHead> */}
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>JOINED</TableHead>
                <TableHead>CURRENT PLAN</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((x: idk) => (
                <TableRow key={x.id}>
                  {/* <TableCell>{x.id}</TableCell> */}
                  <TableCell>{x.full_name}</TableCell>
                  <TableCell>{x.email}</TableCell>
                  <TableCell>{dateExtractor(x.created_at)}</TableCell>
                  <TableCell>{x.subscription_plan_name ?? "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        x.status === "Active" ? "success" : "destructive"
                      }
                    >
                      {x.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DetailsButton x={x} />
                    <UserBlocker x={x} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <div className="flex-1" />

      <CardFooter className="flex w-full justify-between items-center ">
        <div className="text-sm text-muted-foreground font-semibold">
          Page {pagination?.current_page} of {pagination?.last_page}
        </div>

        <div className="">
          <Pagination className="w-min">
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => page > 1 && setPage(page - 1)}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Dynamic Page Numbers */}
              {pagination?.links?.map((link: idk, idx: number) => {
                if (
                  link.label.includes("Previous") ||
                  link.label.includes("Next")
                )
                  return null;

                if (link.label === "...") {
                  return (
                    <PaginationItem key={idx}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={link.active}
                      onClick={() => setPage(Number(link.label))}
                    >
                      {link.label}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    page < pagination?.last_page && setPage(page + 1)
                  }
                  aria-disabled={page === pagination?.last_page}
                  className={
                    page === pagination?.last_page
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
}
