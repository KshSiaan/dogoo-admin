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

import DeleteChallange from "./delete-challange";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { EditIcon, Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";

import { getTypesApi } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";

import AddChal from "./add-chal";

export default function ChallangeTypes() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["type_ch"],
    queryFn: (): idk => {
      return getTypesApi({ token });
    },
  });
  return (
    <>
      <div className="flex justify-end items-center mb-6">
        <AddChal />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>CHALLENGE NAME</TableHead>
            <TableHead>REMARK</TableHead>
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
                challenge_type: string;
                note: string;
                created_at: string;
                updated_at: string;
              }) => (
                <TableRow key={x.id}>
                  <TableCell>{x.id}</TableCell>
                  <TableCell>{x.challenge_type}</TableCell>
                  <TableCell>{x.note}</TableCell>
                  <TableCell>
                    <Button size={"icon"} variant={"ghost"}>
                      <EditIcon />
                    </Button>
                    <DeleteChallange data={x} />
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}
