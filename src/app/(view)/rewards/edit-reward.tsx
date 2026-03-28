"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editGlobalRewardApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LocationPicker, {
  type LocationData,
} from "@/components/core/location-picker";
import { useCookies } from "react-cookie";
import { PencilIcon } from "lucide-react";

const latLngRegex = /^-?\d+(\.\d+)?$/;

const editRewardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  expiration_date: z.string().min(1, "Expiration date is required"),
  purchase_point: z
    .string()
    .min(1, "Purchase point is required")
    .regex(/^\d+$/, "Purchase point must be a whole number")
    .refine((v) => Number(v) > 0, "Purchase point must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  latitude: z
    .string()
    .min(1, "Latitude is required")
    .regex(latLngRegex, "Latitude must be numeric"),
  longitude: z
    .string()
    .min(1, "Longitude is required")
    .regex(latLngRegex, "Longitude must be numeric"),
});

type EditRewardFormValues = z.infer<typeof editRewardSchema>;

export default function EditReward({ data }: { data: idk }) {
  const [open, setOpen] = useState(false);
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const form = useForm<EditRewardFormValues>({
    resolver: zodResolver(editRewardSchema),
    defaultValues: {
      title: "",
      description: "",
      expiration_date: "",
      purchase_point: "",
      location: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (!open || !data) return;

    form.reset({
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      expiration_date: String(data.expiration_date ?? "").split("T")[0] ?? "",
      purchase_point: String(data.purchase_point ?? ""),
      location: String(data.location ?? ""),
      latitude: String(data.latitude ?? ""),
      longitude: String(data.longitude ?? ""),
    });
  }, [data, form, open]);

  const handleLocationSelect = (locationData: LocationData) => {
    form.setValue("location", locationData.address ?? "", {
      shouldValidate: true,
    });
    form.setValue("latitude", locationData.lat.toFixed(6), {
      shouldValidate: true,
    });
    form.setValue("longitude", locationData.lng.toFixed(6), {
      shouldValidate: true,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit_global_reward"],
    mutationFn: (body: {
      title: string;
      description: string;
      expiration_date: string;
      purchase_point: string;
      location: string;
      latitude: string;
      longitude: string;
    }) => {
      return editGlobalRewardApi({ id: data.id, body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Global reward updated successfully!");
      qcl.invalidateQueries({ queryKey: ["global_rewards"] });
      setOpen(false);
    },
  });

  const onSubmit = (values: EditRewardFormValues) => {
    const [year, month, day] = values.expiration_date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const payload = {
      title: values.title,
      description: values.description,
      expiration_date: formattedDate,
      purchase_point: values.purchase_point,
      location: values.location,
      latitude: values.latitude,
      longitude: values.longitude,
    };

    mutate(payload);
  };

  const currentLat = Number(form.watch("latitude"));
  const currentLng = Number(form.watch("longitude"));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Global Reward</DialogTitle>
          <DialogDescription>
            Update reward details and save changes.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Client-title-02" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This is descriptions"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiration_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchase_point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Point</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Select Location</FormLabel>
              <LocationPicker
                initialLocation={
                  Number.isFinite(currentLat) && Number.isFinite(currentLng)
                    ? { lat: currentLat, lng: currentLng }
                    : undefined
                }
                onLocationSelect={handleLocationSelect}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Tangalil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="10.123456" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="12.123456" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Reward"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
