"use client";
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
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTypeApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

export default function DeleteChallange({ data }: { data: idk }) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["delete_challange_type"],
    mutationFn: () => {
      return deleteTypeApi({ type_id: data?.id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["type_ch"] });
      toast.success(
        res.message ?? `Successfully deleted ${data.challenge_type}`
      );
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash2Icon className="text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Challenge</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the &quot;{data.challenge_type}
            &quot; challenge? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => {
                mutate();
              }}
            >
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
