"use client";
import React from "react";
import ViewChallange from "./view-reward";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSubscriptionsApi, getSubscriptionsApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { EditIcon, Loader2Icon, Trash2Icon } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Plan() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["subsc"],
    queryFn: (): idk => {
      return getSubscriptionsApi({ search: "", token });
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["delete_subsc"],
    mutationFn: (id: string) => {
      return deleteSubscriptionsApi({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["subsc"] });
      toast.success(res.message ?? "Success!");
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
            features: string[];
            active_subscribers: number;
            created_at: string;
            updated_at: string;
          }) => (
            <TableRow key={x?.id}>
              <TableCell>{x?.id}</TableCell>
              <TableCell>{x?.plan_name}</TableCell>
              <TableCell>{x?.duration}</TableCell>
              <TableCell>${x?.price}</TableCell>
              <TableCell className="space-x-2">
                {x?.features.map((x) => (
                  <Badge variant={"secondary"} key={x}>
                    {x}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>{x?.active_subscribers}</TableCell>

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
                      <EditPlan data={x} />
                    </div>
                  </DialogContent>
                </Dialog>
                {x.id !== 1 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size={"icon"} variant={"ghost"}>
                        <Trash2Icon className="text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going to delete "{x?.plan_name}" plan. This
                          action can not be undone
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            mutate(String(x.id));
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
