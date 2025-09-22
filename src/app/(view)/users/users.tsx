"use client";
import { Loader2Icon } from "lucide-react";
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

import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "@/lib/api/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, idk } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { dateExtractor } from "@/lib/functions";
import DetailsButton from "./details-button";

import UserBlocker from "./user-blocker";

export default function Users() {
  const [{ token }] = useCookies(["token"]);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: (): idk => getUsersApi({ search, token }),
  });
  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>All Users</CardTitle>
        <div
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-fit min-w-0 rounded-md border bg-transparent px-3 items-center text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          )}
        >
          <SearchIcon className="text-muted-foreground" />
          <Input
            className="outline-none! border-none! ring-0! shadow-none! py-0"
            placeholder="Search.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>JOINED</TableHead>
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
                  phone_number: string;
                  address: string;
                  google_id: idk;
                  last_login_at: idk;
                  created_at: string;
                  updated_at: string;
                  avatar_url: string;
                  profile: {
                    id: number;
                    user_id: number;
                    user_name: string;
                    total_points: number;
                    level: number;
                    used_points: number;
                    business_name: idk;
                    category: string;
                    description: idk;
                    business_hours: idk;
                    created_at: string;
                    updated_at: string;
                  };
                }) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{x.full_name}</TableCell>
                    <TableCell>{x.email}</TableCell>
                    <TableCell>{dateExtractor(x.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant={"success"}>{x.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DetailsButton x={x} />
                      <UserBlocker x={x} />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
