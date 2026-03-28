"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toggleGlobalRewardStatusApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function ToggleGlobalReward({ data }: { data: idk }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const isEnabled = String(data?.status).toLowerCase() === "enable";

  const { mutate, isPending } = useMutation({
    mutationKey: ["toggle_global_reward_status"],
    mutationFn: () => toggleGlobalRewardStatusApi({ id: data.id, token }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Global reward toggled successfully!");
      qcl.invalidateQueries({ queryKey: ["global_rewards"] });
    },
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => mutate()}
      disabled={isPending}
      title={isEnabled ? "Disable reward" : "Enable reward"}
      className={isEnabled ? "text-green-600" : "text-destructive"}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : isEnabled ? (
        <ToggleRightIcon />
      ) : (
        <ToggleLeftIcon />
      )}
    </Button>
  );
}
