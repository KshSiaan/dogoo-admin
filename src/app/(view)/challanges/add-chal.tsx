"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTypeApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  challenge_type: z.string().min(1, "Challenge type is required"),
  note: z.string().optional(),
});

export default function AddChal() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_ch"],
    mutationFn: (body: { challenge_type: string; note?: string }) =>
      addTypeApi({ body, token }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({
        queryKey: ["type_ch"],
      });
      toast.success(res.message ?? "Successfully added challenge type!");
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      challenge_type: "",
      note: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Challenge Type</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Challenge Type</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="challenge_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add Type"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
