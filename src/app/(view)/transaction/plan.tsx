"use client";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { getTransactionsAdminApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/functions";
import { Badge } from "@/components/ui/badge";
import { CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Plan() {
  const [page, setPage] = useState(1);
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["trans"],
    queryFn: (): idk => {
      return getTransactionsAdminApi({ token, page });
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  const pagination = data?.data;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>TRANSACTION ID</TableHead> */}
            <TableHead>USERNAME</TableHead>
            <TableHead>PLAN NAME</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*  */}
          {data?.data?.data?.map(
            (x: {
              id: number;
              payment_intent_id: string;
              card_number: idk;
              user_name: string;
              user_id: number;
              plan_name: string;
              date: string;
              renewal: string;
              amount: string;
              status: string;
              created_at: string;
              updated_at: string;
            }) => (
              <TableRow key={x.id}>
                {/* <TableCell>{x.id}</TableCell> */}
                <TableCell>{x.user_name}</TableCell>
                <TableCell>{x.plan_name}</TableCell>
                <TableCell>${x.amount}</TableCell>
                <TableCell>{dateExtractor(x.created_at)}</TableCell>
                <TableCell>
                  <Badge
                    variant={x.status === "Completed" ? "success" : "secondary"}
                  >
                    {x.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      {pagination && (
        <CardFooter className="flex w-full justify-between items-center mt-12 px-0">
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
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
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
      )}
    </>
  );
}
