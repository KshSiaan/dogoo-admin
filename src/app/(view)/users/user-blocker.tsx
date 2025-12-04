"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BanIcon, UserCheckIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUnblockUserApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
export default function UserBlocker({ x }: { x: idk }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["block_unblock"],
    mutationFn: () => {
      return blockUnblockUserApi({ id: x.id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(
        `Successfully ${x.status === "Blocked" ? "unblocked" : "blocked"} ${
          x.full_name
        }`
      );
      qcl.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>
          {x.status === "Blocked" ? <UserCheckIcon /> : <BanIcon />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="border-b pb-4">
          <AlertDialogTitle>
            {x.status === "Blocked" ? "Unblock" : "Block"} User
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="">
          Are you sure you want to{" "}
          {x.status === "Blocked" ? "unblock" : "block"} <b>{x?.full_name}</b>?
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate();
            }}
          >
            {x.status === "Blocked" ? "Unblock" : "Block"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
