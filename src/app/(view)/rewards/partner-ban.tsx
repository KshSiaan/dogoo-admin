"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { blockUnblockPartnerApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BanIcon } from "lucide-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function PartnerBan({ data }: { data: idk }) {
  const [{ token }] = useCookies(["token"]);
  const [open, setOpen] = useState(false);
  const qcl = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["ban_unban_partner"],
    mutationFn: () => blockUnblockPartnerApi({ user_id: data.id, token }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({
        queryKey: ["partners"],
      });
      toast.success(res.message ?? "Successfully marked as Cancel!");
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        className="text-destructive"
        onClick={() => setOpen(true)}
      >
        <BanIcon />
      </Button>

      <DialogContent>
        <DialogHeader className="border-b px-0! pb-2">
          <DialogTitle>
            {data.status === "Blocked" ? "Unban" : "Ban"} &quot;{data.full_name}
            &quot;??
          </DialogTitle>
        </DialogHeader>

        <p className="py-4 text-sm">
          Are you sure you want to {data.status === "Blocked" ? "unban" : "ban"}{" "}
          &quot;{data.full_name}&quot;?
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => mutate()}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
