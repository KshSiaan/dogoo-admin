"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getGlobalRewardsApi,
  getRadiusApi,
  setRadiusApi,
} from "@/lib/api/admin";
import { dateExtractor } from "@/lib/functions";
import { idk } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EyeIcon, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddReward from "./add-reward";
import DeleteGlobalReward from "./delete-global-reward";
import EditReward from "./edit-reward";
import ToggleGlobalReward from "./toggle-global-reward";

export default function GlobalRewards() {
  const [{ token }] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const [radius, setRadius] = useState<string>("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data: radiusData, isPending: isRadiusPending } = useQuery({
    queryKey: ["global_reward_radius"],
    queryFn: (): idk => {
      return getRadiusApi({ token });
    },
  });

  const { data: globalRewardsData, isPending: isGlobalRewardsPending } =
    useQuery({
      queryKey: ["global_rewards", page, perPage],
      queryFn: (): idk => {
        return getGlobalRewardsApi({ token, page, per_page: perPage });
      },
    });

  const { mutate, isPending: saving } = useMutation({
    mutationKey: ["set_global_reward_radius"],
    mutationFn: (value: number) => {
      return setRadiusApi({ global_reward_radius: value, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      queryClient.invalidateQueries({
        queryKey: ["global_reward_radius"],
      });
      toast.success(res.message ?? "Radius updated successfully!");
    },
  });

  useEffect(() => {
    const value = radiusData?.data?.global_reward_radius;
    if (value !== undefined && value !== null) {
      setRadius(String(value));
    }
  }, [radiusData]);

  const currentRadius = String(radiusData?.data?.global_reward_radius ?? "");
  const isRadiusChanged = radius.trim() !== currentRadius;
  const pagination = globalRewardsData?.data;

  return (
    <div className="w-full">
      <div className="flex justify-end items-center gap-4 mb-4">
        <Input
          type="number"
          min={0}
          className="max-w-[300px]"
          value={radius}
          onChange={(e) => {
            const value = e.target.value;
            // Prevent negative values
            if (value === "" || Number(value) >= 0) {
              setRadius(value);
            }
          }}
          placeholder="Enter radius"
        />
        <Button
          disabled={saving || !radius || !isRadiusChanged}
          onClick={() => {
            const parsedRadius = Number(radius);

            if (!Number.isFinite(parsedRadius) || parsedRadius < 0) {
              toast.error("Please enter a valid radius");
              return;
            }

            mutate(parsedRadius);
          }}
        >
          {saving || isRadiusPending ? "Setting..." : "Set Radius"}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground text-right">
        Current radius: {radiusData?.data?.global_reward_radius ?? "N/A"}{" "}
        {radiusData?.data?.unit ?? ""}
      </p>

      <div className="mt-8">
        {isGlobalRewardsPending ? (
          <div className="flex justify-center items-center h-24 mx-auto">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TITLE</TableHead>
                  <TableHead>CREATOR</TableHead>
                  <TableHead>POINT REQUIRED</TableHead>
                  <TableHead>LOCATION</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>EXP. DATE</TableHead>
                  <TableHead className="text-center">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(globalRewardsData?.data?.data ?? []).map((x: idk) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.title}</TableCell>
                    <TableCell>{x.reward_creator}</TableCell>
                    <TableCell>{x.purchase_point}</TableCell>
                    <TableCell>{x.location ?? "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          x.status === "Enable" ? "success" : "destructive"
                        }
                      >
                        {x.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{dateExtractor(x.expiration_date)}</TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EyeIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader className="pb-2 border-b">
                            <DialogTitle>Global Reward Details</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-semibold">Title:</span>{" "}
                              {x.title}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Description:
                              </span>{" "}
                              {x.description}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Point Required:
                              </span>{" "}
                              {x.purchase_point}
                            </p>
                            <p>
                              <span className="font-semibold">Location:</span>{" "}
                              {x.location ?? "N/A"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Coordinates:
                              </span>{" "}
                              {x.latitude ?? "N/A"}, {x.longitude ?? "N/A"}
                            </p>
                            <p>
                              <span className="font-semibold">Creator:</span>{" "}
                              {x.reward_creator ?? "N/A"}
                            </p>
                            <p>
                              <span className="font-semibold">Approval:</span>{" "}
                              {x.admin_approved}
                            </p>
                            <p>
                              <span className="font-semibold">Status:</span>{" "}
                              {x.status}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <EditReward data={x} />

                      <ToggleGlobalReward data={x} />

                      <DeleteGlobalReward data={x} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {pagination && (
              <div className="flex w-full justify-between items-center mt-12 px-0">
                <div className="text-sm text-muted-foreground font-semibold">
                  Page {pagination?.current_page} of {pagination?.last_page}
                </div>

                <Pagination className="w-min">
                  <PaginationContent>
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

                    {pagination?.links?.map((link: idk, idx: number) => {
                      if (
                        link.label.includes("Previous") ||
                        link.label.includes("Next")
                      ) {
                        return null;
                      }

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
            )}
          </>
        )}
      </div>
    </div>
  );
}
