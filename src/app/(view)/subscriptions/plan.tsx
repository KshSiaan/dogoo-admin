"use client";
import React from "react";
import ViewChallange from "./view-reward";
import DeleteChallange from "./delete-reward";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionsApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { EditIcon, Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPlan from "./edit-plan";

export default function Plan() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["subsc"],
    queryFn: (): idk => {
      return getSubscriptionsApi({ search: "", token });
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
          <TableHead>PLAN NAME</TableHead>
          <TableHead>DURATION</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>FEATURES</TableHead>
          <TableHead>ACTIVE SUBSCRIBERS</TableHead>
          {/* <TableHead>STATUS</TableHead> */}
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map(
          (x: {
            id: number;
            plan_name: string;
            duration: string;
            price: string;
            features: string;
            active_subscribers: number;
            created_at: string;
            updated_at: string;
          }) => (
            <TableRow key={x?.id}>
              <TableCell>{x?.id}</TableCell>
              <TableCell>{x?.plan_name}</TableCell>
              <TableCell>{x?.duration}</TableCell>
              <TableCell>${x?.price}</TableCell>
              <TableCell>{x?.features}</TableCell>
              <TableCell>{x?.active_subscribers}</TableCell>
              {/* <TableCell>
                <Badge variant={"success"}>Active</Badge>
              </TableCell> */}

              <TableCell>
                <ViewChallange data={x} />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <EditIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{x?.plan_name} plan</DialogTitle>
                    </DialogHeader>
                    <div className="w-full">
                      <EditPlan price={x?.price} />
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
