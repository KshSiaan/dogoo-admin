"use client";
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

export default function Available() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["reward"],
    queryFn: (): idk => {
      return getRewardsApi({ token });
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
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>REWARD NAME</TableHead>
          <TableHead>TYPE</TableHead>
          <TableHead>POINT REQUIRED</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>EXP. DATE</TableHead>
          {/* <TableHead>REDEMPTIONS</TableHead> */}
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
  );
}
