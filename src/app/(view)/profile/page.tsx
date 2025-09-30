"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileApi, updateProfileApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { toast } from "sonner";

// Zod schema
const formSchema = z.object({
  fullName: z.string().optional(),
  contactNumber: z.string().optional(),
  location: z.string().optional(),
});

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null); // string URL
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: (): idk => getProfileApi(token),
  });

  const { mutate } = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: (body: FormData) => {
      return updateProfileApi({ token, body });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["profile"] });
      toast.success(res.message ?? "Success!");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      location: "",
    },
  });

  useEffect(() => {
    if (!isPending && data?.data?.user) {
      if (data.data.user.avatar_url) {
        setSelectedImg(data.data.user.avatar_url); // server URL
      }
      form.setValue("fullName", data.data.user.full_name);
      form.setValue("contactNumber", data?.data?.user?.phone_number ?? "");
      form.setValue("location", data?.data?.user?.address ?? "");
    }
  }, [isPending, data, form]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImg(URL.createObjectURL(file)); // preview immediately
      console.log("Selected image:", file);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    console.log("Selected file:", selectedFile);

    const payload = new FormData();

    if (values.fullName) {
      payload.append("full_name", values.fullName);
    }

    if (values.contactNumber) {
      payload.append("phone_number", values.contactNumber);
    }

    if (values.location) {
      payload.append("address", values.location);
    }

    if (selectedFile) {
      payload.append("avatar", selectedFile);
    }

    try {
      mutate(payload);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <main className="py-6 h-full">
      <Card className="h-fit">
        <CardHeader className="border-b">
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Image Upload */}
          <label htmlFor="img">
            <div className="size-[140px] aspect-square mx-auto border-dashed border-4 hover:bg-foreground/5 transition-colors rounded-lg flex justify-center items-center cursor-pointer">
              {selectedImg ? (
                <img
                  src={selectedImg}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ImageIcon className="text-muted-foreground size-[64px]" />
              )}
              <input
                type="file"
                className="hidden"
                id="img"
                name="img"
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
          </label>
          <h3 className="mx-auto text-center mt-6 font-semibold">
            Upload your image
          </h3>

          {/* Form Fields */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex-col gap-6">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>

                {/* Update Password Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      Update password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Password</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Label>Current Password: </Label>
                      <Input type="password" />
                      <Label>New Password: </Label>
                      <Input type="password" />
                      <Label>Confirm Password: </Label>
                      <Input type="password" />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button>Update</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
