"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { idk } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import React from "react";

export default function ViewChallangePartner({
  data,
}: {
  data: {
    id: number;
    full_name: string;
    role: string;
    email: string;
    email_verified_at: string;
    status: string;
    otp_verified_at: idk;
    otp: idk;
    otp_expires_at: idk;
    phone_number: idk;
    address: idk;
    google_id: idk;
    last_login_at: idk;
    created_at: string;
    updated_at: string;
    rewards_offered: number;
    avatar_url: string;
    profile: {
      id: number;
      user_id: number;
      user_name: idk;
      total_points: number;
      level: number;
      used_points: number;
      business_name: idk;
      category: idk;
      description: idk;
      business_hours: idk;
      created_at: string;
      updated_at: string;
    };
  };
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Challenge Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 text-sm items-start">
          {/* Left Column - Basic Info */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Business ID:</p>
                <p className="text-muted-foreground">{data.id}</p>
              </div>
              <div>
                <p className="font-semibold">Business Name:</p>
                <p className="text-muted-foreground">
                  {data.profile.business_name ?? "N/A"}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Description:</p>
                <p className="text-muted-foreground">
                  {data.profile.description ?? "N/A"}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Phone:</p>
                <p className="text-muted-foreground">
                  {data.phone_number ?? "N/A"}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Email:</p>
                <p className="text-muted-foreground">{data.email ?? "N/A"}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Status:</p>
                <p className="text-muted-foreground">{data.status}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-base font-semibold">Rewards Offered</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Total Rewards:</p>
                <p className="text-muted-foreground">
                  {data.profile.total_points}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
