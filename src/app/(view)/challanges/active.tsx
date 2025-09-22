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
import DeleteChallange from "./delete-challange";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getActiveChallengesApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { dateExtractor } from "@/lib/functions";
export default function Active() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["active-challange"],
    queryFn: (): idk => {
      return getActiveChallengesApi({ token });
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>CHALLENGE NAME</TableHead>
          <TableHead>TYPE</TableHead>
          <TableHead>START DATE</TableHead>
          <TableHead>END DATE</TableHead>
          <TableHead>PARTICIPANTS</TableHead>
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
                <TableCell>{dateExtractor(x.start_date)}</TableCell>
                <TableCell>{dateExtractor(x.end_date)}</TableCell>
                <TableCell>
                  <Badge variant="success">{x.status}</Badge>
                </TableCell>
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
