"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotifications, readNotif, readNotifAll } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
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
import { cn, idk } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { dateExtractor, timeExtractor } from "@/lib/functions";
import { Button } from "@/components/ui/button";
export default function All() {
  const [page, setPage] = useState(1);
  const [{ token }] = useCookies(["token"]);
  const { data, refetch, isPending } = useQuery({
    queryKey: ["notifications", page],
    queryFn: (): idk => {
      return getNotifications({ token, page });
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["read_notif"],
    mutationFn: (id: string) => {
      return readNotif({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      refetch();
      toast.success(res.message ?? "Successfully read notification");
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
      <div className="flex mb-6 justify-end items-center">
        <Button
          onClick={async () => {
            try {
              const res: idk = await readNotifAll({ token });
              refetch();
              toast.success(
                res.message ?? "Successfully read all notification"
              );
            } catch (error) {
              toast.error("Something went wrong");
            }
          }}
        >
          Read all notification
        </Button>
      </div>
      <div className="space-y-6">
        {data?.data?.data?.map((x: idk) => (
          <Card
            key={x.id}
            className={cn(
              !x.read_at &&
                "border border-lime-600 cursor-pointer hover:bg-secondary"
            )}
            onClick={() => {
              if (!x.read_at) {
                mutate(x.id);
              }
            }}
          >
            <CardHeader className="w-full flex justify-between items-center">
              <CardTitle className="text-sm">{x.data.title}</CardTitle>
              {x.read_at && (
                <p className="text-xs font-semibold text-muted-foreground">
                  {dateExtractor(x.read_at)} {timeExtractor(x.read_at)}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex justify-between items-end">
              <CardDescription>{x.data.body}</CardDescription>
              {!x.read_at && (
                <div className="">
                  <div className="size-2.5 rounded-full bg-lime-600"></div>
                </div>
              )}{" "}
            </CardContent>
          </Card>
        ))}
      </div>
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
