import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ViewRecentUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Recent User Details</DialogTitle>
        </DialogHeader>
        <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
          {/* Left Column */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Full Name:</p>
                <p className="text-muted-foreground">Liam Nickson</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Email:</p>
                <p className="text-muted-foreground">li@example.com</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Joining Date:</p>
                <p className="text-muted-foreground">12 June 2025</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Last Active:</p>
                <p className="text-muted-foreground">Today, 10:45 am</p>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">Status:</p>
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Account Details</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Subscription:</p>
                <p className="text-muted-foreground">Premium</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Payment Method:</p>
                <p className="text-muted-foreground">Visa ****4242</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Rewards Redeemed:</p>
                <p className="text-muted-foreground">3</p>
              </div>
            </div>
          </div>

          {/* Second Row - Full Width */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Challenges Completed:</p>
                <p className="text-muted-foreground">12</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Current Streak:</p>
                <p className="text-muted-foreground">45 days</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Total Points:</p>
                <p className="text-muted-foreground">2450</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Last Active:</p>
                <p className="text-muted-foreground">Today, 10:45 am</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
