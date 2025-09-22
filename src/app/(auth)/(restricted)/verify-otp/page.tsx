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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyOtpApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function Page() {
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);
  const { mutate } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (dataset: { otp: string }) => verifyOtpApi({ body: dataset }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to verify OTP");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "OTP verified!");
      if (!res.data.token) {
        toast.error("Failed to create Session!", {
          description: "Please try again",
        });
      }
      try {
        setCookie("token", res.data.token);
        router.push("/new-pass");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted OTP:", values);
    mutate(values);
  }

  return (
    <Card className="w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>Verify</span>{" "}
          <span className="relative text-[#D6DF22]">
            Identity
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-[#D6DF20] to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col items-center justify-center"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP {...field} maxLength={6}>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPGroup key={i}>
                          <InputOTPSlot index={i} />
                        </InputOTPGroup>
                      ))}
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex-col gap-4 px-0 w-full">
              <Button className="w-full" type="submit">
                Verify Code
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
