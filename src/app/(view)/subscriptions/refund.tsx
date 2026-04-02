"use client";

import React, { useEffect, useState } from "react";
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
import { getPlansApi, refundPlanApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Eye, Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface PlanData extends idk {
  id: number;
  user_id: number;
  plan_name: string;
  duration: string;
  price: string;
  features: string[];
  renewal: string;
  status: string;
  store: string;
  storeTransactionId: string;
  created_at: string;
  updated_at: string;
  isRefund: boolean;
}

export default function Refund() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["get_plans"],
    enabled: !!token && isClient,
    queryFn: async (): Promise<idk> => {
      try {
        const res: idk = await getPlansApi({ token });
        if (!res || !Array.isArray(res?.data))
          throw new Error("Invalid response");
        return res;
      } catch (err: any) {
        throw new Error(err?.message || "Failed to load plans");
      }
    },
    retry: 1,
    staleTime: 1000 * 60,
  });

  const { mutate: refundMutate, isPending: isRefunding } = useMutation({
    mutationKey: ["refund_plan"],
    mutationFn: async (storeTransactionId: string) => {
      if (!token) throw new Error("Unauthorized request");
      return await refundPlanApi({ storeTransactionId, token });
    },
    onError: (err: any) => {
      const errorMsg = err?.message ?? "Failed to complete refund";
      toast.error(errorMsg);
    },
    onSuccess: async (res: idk) => {
      toast.success(res?.message ?? "Refund processed successfully!");
      await qcl.invalidateQueries({ queryKey: ["get_plans"] });
      refetch();
    },
  });

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
          <CardTitle>No plans found</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PLAN NAME</TableHead>
          <TableHead>DURATION</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>RENEWAL</TableHead>
          <TableHead>STORE</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((plan: PlanData) => (
          <TableRow key={plan?.id ?? Math.random()}>
            <TableCell>{plan?.plan_name ?? "Unnamed"}</TableCell>
            <TableCell>{plan?.duration ?? "-"}</TableCell>
            <TableCell>${plan?.price ?? "0"}</TableCell>
            <TableCell>
              <Badge
                variant={plan?.status === "Paid" ? "default" : "secondary"}
              >
                {plan?.status ?? "-"}
              </Badge>
            </TableCell>
            <TableCell>{plan?.renewal ?? "-"}</TableCell>
            <TableCell>{plan?.store ?? "-"}</TableCell>

            <TableCell className="flex items-center gap-4">
              {/* View Details Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" title="View details">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{plan?.plan_name} - Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          ID
                        </label>
                        <p className="text-sm font-semibold">{plan?.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          User ID
                        </label>
                        <p className="text-sm font-semibold">{plan?.user_id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Plan Name
                        </label>
                        <p className="text-sm font-semibold">
                          {plan?.plan_name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Duration
                        </label>
                        <p className="text-sm font-semibold">
                          {plan?.duration}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Price
                        </label>
                        <p className="text-sm font-semibold">${plan?.price}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Status
                        </label>
                        <p className="text-sm font-semibold">{plan?.status}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Renewal
                        </label>
                        <p className="text-sm font-semibold">{plan?.renewal}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Store
                        </label>
                        <p className="text-sm font-semibold">{plan?.store}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Store Transaction ID
                        </label>
                        <p className="text-sm font-semibold">
                          {plan?.storeTransactionId}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Is Refund
                        </label>
                        <Badge
                          variant={plan?.isRefund ? "destructive" : "secondary"}
                        >
                          {plan?.isRefund ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Created At
                        </label>
                        <p className="text-sm font-semibold">
                          {plan?.created_at}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Updated At
                        </label>
                        <p className="text-sm font-semibold">
                          {plan?.updated_at}
                        </p>
                      </div>
                    </div>
                    {Array.isArray(plan?.features) &&
                      plan.features.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Features
                          </label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {plan.features.map((feature: string) => (
                              <Badge key={feature} variant="secondary">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Refund Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={plan?.isRefund || isRefunding}
                    title={
                      plan?.isRefund ? "Already refunded" : "Process refund"
                    }
                    className={plan?.isRefund ? "opacity-50" : ""}
                  >
                    {isRefunding ? (
                      <Loader2Icon className="animate-spin h-4 w-4" />
                    ) : (
                      <span className="text-sm font-semibold">Refund</span>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Process Refund?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You're about to process a refund for "{plan?.plan_name}"
                      (${plan?.price}). This action can't be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        refundMutate(plan?.storeTransactionId ?? "")
                      }
                    >
                      Confirm Refund
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
