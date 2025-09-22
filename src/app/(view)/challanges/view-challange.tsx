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

export default function ViewChallange({ data }: { data: idk }) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

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
          {/* Left Column */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Group Name:</p>
                <p className="text-muted-foreground">{data.group_name}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Type:</p>
                <p className="text-muted-foreground">{data.challenge_type}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Duration:</p>
                <p className="text-muted-foreground">{data.duration} days</p>
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
                  {formatDate(data.start_date)}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Ending Date:</p>
                <p className="text-muted-foreground">
                  {formatDate(data.end_date)}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">Status:</p>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    data.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
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
                <p className="font-semibold">Participants:</p>
                <p className="text-muted-foreground">{data.members_count}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Max Capacity:</p>
                <p className="text-muted-foreground">{data.max_count}</p>
              </div>
            </div>
          </div>

          {/* Second Row, Right Column - Info */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Meta</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Created At:</p>
                <p className="text-muted-foreground">
                  {formatDate(data.created_at)}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Updated At:</p>
                <p className="text-muted-foreground">
                  {formatDate(data.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
