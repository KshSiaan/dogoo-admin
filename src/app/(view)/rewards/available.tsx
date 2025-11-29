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
import { Badge } from "@/components/ui/badge";
import ViewChallange from "./view-reward";
import DeleteChallange from "./delete-reward";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveRewardApi, getRewardsApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { dateExtractor } from "@/lib/functions";
import { idk } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
export default function Available() {
  const [page, setPage] = useState(1);
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["reward"],
    queryFn: (): idk => {
      return getRewardsApi({ token, page });
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["approve_reward"],
    mutationFn: (id: string | number) => {
      return approveRewardApi({ reward_id: id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({
        queryKey: ["reward"],
      });
      toast.success(res.message ?? "Successfully approved!");
    },
  });

  const pagination = data?.data;

  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <>
      {" "}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>REWARD NAME</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>POINT REQUIRED</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>EXP. DATE</TableHead>
            <TableHead>ADMIN APPROVAL</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.map(
            (x: {
              id: number;
              partner_id: number;
              title: string;
              challenge_type: string;
              description: string;
              expiration_date: string;
              purchase_point: number;
              status: string;
              admin_approved: string;
              created_at: string;
              updated_at: string;
            }) => (
              <TableRow key={x.id}>
                <TableCell>{x.id}</TableCell>
                <TableCell>{x.title}</TableCell>
                <TableCell>{x.challenge_type}</TableCell>
                <TableCell>{x.purchase_point}</TableCell>
                <TableCell>
                  <Badge
                    variant={x.status === "Enable" ? "success" : "destructive"}
                  >
                    {x.status}
                  </Badge>
                </TableCell>
                <TableCell>{dateExtractor(x.expiration_date)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      x?.admin_approved === "Accepted" ? "success" : "outline"
                    }
                  >
                    {x?.admin_approved}
                  </Badge>
                </TableCell>
                <TableCell>
                  {x.status === "Enable" && (
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => {
                        mutate(x.id);
                      }}
                    >
                      <CheckIcon />
                    </Button>
                  )}
                  <ViewChallange data={x} />
                  <DeleteChallange data={x} />
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
