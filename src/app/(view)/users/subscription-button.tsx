"use client";

import React, { useState } from "react";
import { CircleDollarSign, Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  getSubscriptionsApi,
  addFreeSubscriptionApi,
  getFreeSubscriptionsApi,
  removeFreeSubscriptionApi,
} from "@/lib/api/admin";
import { idk } from "@/lib/utils";

interface UserSubButtonProps {
  user: {
    id: number;
    full_name: string;
    email: string;
    subscription_plan_name?: string | null;
  };
}

export default function UserSubscriptionButton({ user }: UserSubButtonProps) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const isFreeUser = !user.subscription_plan_name || user.subscription_plan_name.toLowerCase() === "free";

  if (isFreeUser) {
    return <AssignSubDialog user={user} token={token} onSuccess={() => qcl.invalidateQueries({ queryKey: ["users"] })} />;
  }

  return <RemoveSubButton user={user} token={token} onSuccess={() => qcl.invalidateQueries({ queryKey: ["users"] })} />;
}

function AssignSubDialog({
  user,
  token,
  onSuccess,
}: {
  user: UserSubButtonProps["user"];
  token?: string;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");

  const { data: subsData } = useQuery<idk>({
    queryKey: ["subs_for_free_sub"],
    enabled: open && !!token,
    queryFn: () => getSubscriptionsApi({ token }),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["assign_sub_user", user.id],
    mutationFn: () =>
      addFreeSubscriptionApi({
        body: { user_id: String(user.id), subscription_id: subscriptionId },
        token,
      }),
    onError: (err: any) => toast.error(err?.message ?? "Failed to assign subscription"),
    onSuccess: (res: idk) => {
      toast.success(res?.message ?? "Subscription assigned!");
      setOpen(false);
      setSubscriptionId("");
      onSuccess();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Assign subscription">
          <CircleDollarSign className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Select subscription for &quot;{user.full_name || user.email}&quot;
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Subscription Plan</Label>
            <Select value={subscriptionId} onValueChange={setSubscriptionId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(subsData?.data) &&
                  subsData.data
                    .filter((s: idk) => s.plan_name?.toLowerCase() !== "free")
                    .map((s: idk) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.plan_name ?? `Plan #${s.id}`} — {s.duration}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => mutate()} disabled={isPending || !subscriptionId}>
            {isPending ? <Loader2Icon className="animate-spin h-4 w-4" /> : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RemoveSubButton({
  user,
  token,
  onSuccess,
}: {
  user: UserSubButtonProps["user"];
  token?: string;
  onSuccess: () => void;
}) {
  const [fetchEnabled, setFetchEnabled] = useState(false);

  const { data: freeSubs, isFetching } = useQuery<idk>({
    queryKey: ["user_free_sub_record", user.id],
    enabled: fetchEnabled && !!token,
    queryFn: () => getFreeSubscriptionsApi({ token }),
    staleTime: 0,
  });

  const subRecord = Array.isArray(freeSubs?.data)
    ? (freeSubs.data as idk[]).find((s: idk) => s.user_id === user.id)
    : null;

  const { mutate, isPending } = useMutation({
    mutationKey: ["remove_sub_user", user.id],
    mutationFn: () => {
      if (!subRecord?.id) throw new Error("Subscription record not found");
      return removeFreeSubscriptionApi({ id: subRecord.id, token });
    },
    onError: (err: any) => toast.error(err?.message ?? "Failed to remove subscription"),
    onSuccess: (res: idk) => {
      toast.success(res?.message ?? "Subscription removed!");
      onSuccess();
    },
  });

  return (
    <AlertDialog onOpenChange={(open) => { if (open) setFetchEnabled(true); }}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Remove subscription">
          <CircleDollarSign className="h-4 w-4 text-primary" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the &quot;{user.subscription_plan_name}&quot; subscription from{" "}
            <b>{user.full_name || user.email}</b>. They will become a free user. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate()}
            disabled={isPending || isFetching || !subRecord}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending || isFetching ? (
              <Loader2Icon className="animate-spin h-4 w-4" />
            ) : (
              "Remove"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
