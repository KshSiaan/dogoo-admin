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

import DeleteChallange from "./delete-challange";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { EditIcon, Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";

import { getTypesApi } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";

import AddChal from "./add-chal";
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

export default function ChallangeTypes() {
  const [page, setPage] = useState(1);
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["type_ch"],
    queryFn: (): idk => {
      return getTypesApi({ token });
    },
  });

  const pagination = data?.data;
  return (
    <>
      <div className="flex justify-end items-center mb-6">
        <AddChal />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>CHALLENGE NAME</TableHead>
            <TableHead>REMARK</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <Loader2Icon className="animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.data?.map(
              (x: {
                id: number;
                challenge_type: string;
                note: string;
                created_at: string;
                updated_at: string;
              }) => (
                <TableRow key={x.id}>
                  <TableCell>{x.id}</TableCell>
                  <TableCell>{x.challenge_type}</TableCell>
                  <TableCell>{x.note}</TableCell>
                  <TableCell>
                    <Button size={"icon"} variant={"ghost"}>
                      <EditIcon />
                    </Button>
                    <DeleteChallange data={x} />
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
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
    </>
  );
}
