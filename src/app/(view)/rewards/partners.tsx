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
import DeleteChallange from "./delete-reward";
import { useQuery } from "@tanstack/react-query";
import { getPartnersApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import ViewChallangePartner from "./view-reward-partner";
import PartnerBan from "./partner-ban";

export default function Partners() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["partners"],
    queryFn: (): idk => {
      return getPartnersApi({ token });
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
          <TableHead>BUSINESS NAME</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>PHONE</TableHead>
          <TableHead>REWARDS OFFERED</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.data.map(
          (x: {
            id: number;
            full_name: string;
            role: string;
            email: string;
            email_verified_at: string;
            status: string;
            otp_verified_at: idk;
            otp: idk;
            otp_expires_at: idk;
            phone_number: idk;
            address: idk;
            google_id: idk;
            last_login_at: idk;
            created_at: string;
            updated_at: string;
            rewards_offered: number;
            avatar_url: string;
            profile: {
              id: number;
              user_id: number;
              user_name: idk;
              total_points: number;
              level: number;
              used_points: number;
              business_name: idk;
              category: idk;
              description: idk;
              business_hours: idk;
              created_at: string;
              updated_at: string;
            };
          }) => (
            <TableRow key={x.id}>
              <TableCell>{x.id}</TableCell>
              <TableCell>{x.profile.user_name ?? "N/A"}</TableCell>
              <TableCell>{x.full_name}</TableCell>
              <TableCell>{x.email}</TableCell>
              <TableCell>{x.email}</TableCell>
              <TableCell>{x.rewards_offered}</TableCell>
              {/* <TableCell>245</TableCell> */}
              <TableCell>
                <Badge
                  variant={x.status === "Active" ? "success" : "destructive"}
                >
                  {x.status}
                </Badge>
              </TableCell>
              <TableCell>
                <ViewChallangePartner data={x} />
                <PartnerBan data={x} />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
