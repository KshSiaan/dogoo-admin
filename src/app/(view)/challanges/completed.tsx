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
import ViewChallange from "./view-challange";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getCompletedChallengesApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/functions";
import { Progress } from "@/components/ui/progress";
export default function Completed() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["completed-challange"],
    queryFn: (): idk => {
      return getCompletedChallengesApi({ token });
    },
  });
  return (
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
          data.data.data.map(
            (x: {
              id: number;
              user_id: number;
              group_name: string;
              challenge_type: string;
              duration: string;
              start_date: string;
              end_date: string;
              status: string;
              created_at: string;
              updated_at: string;
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
                <TableCell className="text-center">{x.members_count}</TableCell>
                <TableCell>
                  <ViewChallange data={x} />
                  {/* <DeleteChallange data={x} /> */}
                </TableCell>
              </TableRow>
            )
          )
        )}
      </TableBody>
    </Table>
  );
}
