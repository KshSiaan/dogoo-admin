"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon } from "lucide-react";
import React from "react";

export default function ViewChallenge({
  data,
}: {
  data: {
    id: number;
    partner_id: number;
    title: string;
    challenge_type: string;
    description: string;
    expiration_date: string;
    purchase_point: number;
    status: string;
    admin_approved: string;
    created_at: string;
    updated_at: string;
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

        <div className="grid grid-cols-2 gap-6 text-sm items-start">
          {/* Left Column - Basic Info */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Name:</p>
                <p className="text-muted-foreground">{data.title}</p>
              </div>
              <div>
                <p className="font-semibold">Description:</p>
                <p className="text-muted-foreground">{data.description}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Type:</p>
                <p className="text-muted-foreground">{data.challenge_type}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Reward Points:</p>
                <p className="text-muted-foreground">{data.purchase_point}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Schedule</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Starting Date:</p>
                <p className="text-muted-foreground">
                  {new Date(data.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Ending Date:</p>
                <p className="text-muted-foreground">
                  {new Date(data.expiration_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">Status:</p>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    data.status === "Enable"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {data.status}
                </span>
              </div>
            </div>
          </div>

          {/* Second Row - Participation */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Participation</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Admin Approved:</p>
                <p className="text-muted-foreground">{data.admin_approved}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Partner ID:</p>
                <p className="text-muted-foreground">{data.partner_id}</p>
              </div>
            </div>
          </div>

          {/* Second Row, Right Column - Placeholder for Tasks or extra info */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Other Info</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Last Updated:</p>
                <p className="text-muted-foreground">
                  {new Date(data.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
