"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteGlobalRewardApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function DeleteGlobalReward({ data }: { data: idk }) {
  const [open, setOpen] = useState(false);
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_global_reward"],
    mutationFn: () => deleteGlobalRewardApi({ id: data.id, token }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Global reward deleted successfully!");
      qcl.invalidateQueries({ queryKey: ["global_rewards"] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <TrashIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="border-b px-0! pb-2">
          <DialogTitle>Delete the &quot;{data.title}&quot;</DialogTitle>
        </DialogHeader>

        <p className="py-4 text-sm">
          Are you sure you want to delete the reward &quot;{data.title}&quot;?
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
