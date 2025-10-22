"use client";

import React, { useEffect, useState } from "react";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Plan() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const [isClient, setIsClient] = useState(false);

  // Make sure hooks relying on cookies or window run only on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["subsc"],
    enabled: !!token && isClient, // won't run until token + client are ready
    queryFn: async (): Promise<idk> => {
      try {
        const res: idk = await getSubscriptionsApi({ search: "", token });
        if (!res || !Array.isArray(res?.data))
          throw new Error("Invalid response");
        return res;
      } catch (err: any) {
        throw new Error(err?.message || "Failed to load subscriptions");
      }
    },
    retry: 1, // prevents endless retries if token invalid
    staleTime: 1000 * 60, // 1 min caching for smoother navigate
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["delete_subsc"],
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Unauthorized request");
      return await deleteSubscriptionsApi({ id, token });
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to complete this request");
    },
    onSuccess: async (res: idk) => {
      toast.success(res?.message ?? "Success!");
      await qcl.invalidateQueries({ queryKey: ["subsc"] });
      refetch();
    },
  });

  // --- UI Conditions ---
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-24">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">
            {error?.message || "Something went wrong"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data?.data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No subscription plans found</CardTitle>
        </CardHeader>
      </Card>
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
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.data?.map((x: idk) => (
          <TableRow key={x?.id ?? Math.random()}>
            <TableCell>{x?.id ?? "-"}</TableCell>
            <TableCell>{x?.plan_name ?? "Unnamed"}</TableCell>
            <TableCell>{x?.duration ?? "-"}</TableCell>
            <TableCell>${x?.price ?? "0"}</TableCell>
            <TableCell className="space-x-2">
              {Array.isArray(x?.features) && x.features.length > 0 ? (
                x.features.map((f: idk) => (
                  <Badge key={f} variant="secondary">
                    {f}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">No features</Badge>
              )}
            </TableCell>
            <TableCell>{x?.active_subscribers ?? 0}</TableCell>

            <TableCell className="flex items-center gap-1">
              <ViewChallange data={x} />

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{x?.plan_name} plan</DialogTitle>
                  </DialogHeader>
                  <EditPlan data={x} />
                </DialogContent>
              </Dialog>

              {x?.id !== 1 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost" disabled={isDeleting}>
                      {isDeleting ? (
                        <Loader2Icon className="animate-spin text-destructive" />
                      ) : (
                        <Trash2Icon className="text-destructive" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You’re about to delete “{x?.plan_name}”. This action
                        can’t be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => mutate(String(x?.id))}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
