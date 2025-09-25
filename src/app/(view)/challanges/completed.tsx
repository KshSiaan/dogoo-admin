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
import ViewChallange from "./view-challange";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getCompletedChallengesApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
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

export default function Completed() {
  const [page, setPage] = useState(1);
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["completed-challange", page],
    queryFn: (): idk => getCompletedChallengesApi({ token, page }),
  });

  const pagination = data?.data;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>CHALLENGE NAME</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>DURATION</TableHead>
            <TableHead>COMPLETATION RATE</TableHead>
            <TableHead className="text-center">PARTICIPANTS</TableHead>
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
                user_id: number;
                group_name: string;
                challenge_type: string;
                duration: string;
                members_count: number;
                max_count: number;
              }) => (
                <TableRow key={x.id}>
                  <TableCell>{x.id}</TableCell>
                  <TableCell>{x.group_name}</TableCell>
                  <TableCell>{x.challenge_type}</TableCell>
                  <TableCell>{x.duration} days</TableCell>
                  <TableCell>
                    <Progress className="h-3" value={x.max_count} max={100} />
                  </TableCell>
                  <TableCell className="text-center">
                    {x.members_count}
                  </TableCell>
                  <TableCell>
                    <ViewChallange data={x} />
                  </TableCell>
                </TableRow>
              )
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
