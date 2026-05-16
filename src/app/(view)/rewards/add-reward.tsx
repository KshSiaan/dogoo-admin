"use client";

import React, { useState } from "react";
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
import { addGlobalRewardApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LocationPicker, {
  type LocationData,
} from "@/components/core/location-picker";
import { useCookies } from "react-cookie";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemDelete,
} from "@/components/ui/file-upload";
import { UploadIcon, XIcon } from "lucide-react";
const latLngRegex = /^-?\d+(\.\d+)?$/;

const addRewardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  expiration_date: z.string().min(1, "Expiration date is required"),
  // Date input gives YYYY-MM-DD format
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


type AddRewardFormValues = z.infer<typeof addRewardSchema>;

export default function AddReward() {
  const [open, setOpen] = useState(false);
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const form = useForm<AddRewardFormValues>({
    resolver: zodResolver(addRewardSchema),
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
    const [files, setFiles] = React.useState<File[]>([]);
  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      // Validate max files
      if (files.length >= 1) {
        return "You can only upload up to 1 file";
      }

      // Validate file type (only images)
      if (!file.type.startsWith("image/")) {
        return "Only image files are allowed";
      }

      // Validate file size (max 2MB)
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [files],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

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
    mutationKey: ["add_global_reward"],
    mutationFn: (body: FormData) => {
      return addGlobalRewardApi({ body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Global reward added successfully!");
      qcl.invalidateQueries({ queryKey: ["global_rewards"] });
      form.reset();
      setOpen(false);
    },
  });

  const onSubmit = (values: AddRewardFormValues) => {
    // Transform YYYY-MM-DD to DD/MM/YYYY for API
    const [year, month, day] = values.expiration_date.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const payload = {
      image: files[0] || null, // Assuming you want to send the first file or null if no file is uploaded
      title: values.title,
      description: values.description,
      expiration_date: formattedDate,
      purchase_point: values.purchase_point,
      location: values.location,
      latitude: values.latitude,
      longitude: values.longitude,
    };

    // turn payload into form data
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("expiration_date", payload.expiration_date);
    formData.append("purchase_point", payload.purchase_point);
    formData.append("location", payload.location);
    formData.append("latitude", payload.latitude);
    formData.append("longitude", payload.longitude);

    if (payload.image) {
      formData.append("image", payload.image);
    }

    mutate(formData);
  };

  const currentLat = Number(form.watch("latitude"));
  const currentLng = Number(form.watch("longitude"));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Reward</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Global Reward</DialogTitle>
          <DialogDescription>
            Fill the fields below to prepare the reward payload before API
            integration.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           <FileUpload
                value={files}
                onValueChange={setFiles}
                onFileValidate={onFileValidate}
                onFileReject={onFileReject}
                accept="image/*"
                maxFiles={1}
                maxSize={2 * 1024 * 1024} // 2MB
                className="w-full "
                multiple={false}
              >
                <FileUploadDropzone>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                      <UploadIcon className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">
                      Drag & drop files here
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Or click to browse (max 1 file, only images, max size 2MB)
                    </p>
                  </div>
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      Browse files
                    </Button>
                  </FileUploadTrigger>
                </FileUploadDropzone>
                <FileUploadTrigger />
                <FileUploadList>
                  {files.map((file) => (
                    <FileUploadItem key={file.name} value={file}>
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata />
                      <FileUploadItemDelete asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <XIcon />
                        </Button>
                      </FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload>
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
                    <Input placeholder="Tangalil" {...field} disabled/>
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
                {isPending ? "Adding..." : "Add Reward"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
