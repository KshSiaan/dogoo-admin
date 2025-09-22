"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPassApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export default function Page() {
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (dataset: { email: string }) =>
      forgotPassApi({ body: dataset }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to send verification code");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Verification code sent!");
      navig.push("/verify-otp");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted email:", values);
    mutate(values);
  }

  return (
    <Card className="w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>Reset</span>{" "}
          <span className="relative text-[#D6DF22]">
            Password
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-[#D6DF20] to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          We&apos;ll send a verification code to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex-col gap-4 px-0">
              <Button className="w-full" type="submit">
                Send Verification Code
              </Button>
              <Button className="w-fit mx-auto" variant="link" asChild>
                <Link href={"/login"}>Back to Login</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
