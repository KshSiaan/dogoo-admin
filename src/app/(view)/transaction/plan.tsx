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

import { useQuery } from "@tanstack/react-query";
import { getTransactionsAdminApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/functions";
import { Badge } from "@/components/ui/badge";

export default function Plan() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["subsc"],
    queryFn: (): idk => {
      return getTransactionsAdminApi({ token });
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
          <TableHead>TRANSACTION ID</TableHead>
          <TableHead>USER</TableHead>
          <TableHead>PLAN NAME</TableHead>
          <TableHead>AMOUNT</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>RENEWAL</TableHead>
          <TableHead>STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.data.map(
          (x: {
            id: number;
            payment_intent_id: string;
            card_number: idk;
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
              <TableCell>{x.id}</TableCell>
              <TableCell>{x.user_id}</TableCell>
              <TableCell>{x.plan_name}</TableCell>
              <TableCell>${x.amount}</TableCell>
              <TableCell>{dateExtractor(x.created_at)}</TableCell>
              <TableCell>{dateExtractor(x.renewal)}</TableCell>
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
  );
}
