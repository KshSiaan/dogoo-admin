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

export default function ViewChallange() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Recent Challenges Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 text-sm items-start">
          {/* Left Column */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Name:</p>
                <p className="text-muted-foreground">
                  30-Day Fitness Challenge
                </p>
              </div>
              <div className="">
                <p className="font-semibold">Description:</p>
                <p className="text-muted-foreground">
                  Complete daily fitness activities for 30 days to improve  
                  health and wellness.
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Type:</p>
                <p className="text-muted-foreground">Health</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Duration:</p>
                <p className="text-muted-foreground">30 days</p>
              </div>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Schedule</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Starting Date:</p>
                <p className="text-muted-foreground">12 June 2025</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Ending Date:</p>
                <p className="text-muted-foreground">20 June 2025</p>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">Status:</p>
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded">
                  Active
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
                <p className="text-muted-foreground">245</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Completion Rate:</p>
                <p className="text-muted-foreground">72%</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Reward Points:</p>
                <p className="text-muted-foreground">500</p>
              </div>
            </div>
          </div>

          {/* Second Row, Right Column - Tasks */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Tasks</h4>

            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="text-muted-foreground">30 minutes of exercise</p>
              </div>
              <div className="flex space-x-2">
                <p className="text-muted-foreground">10,000 steps</p>
              </div>
              <div className="flex space-x-2">
                <p className="text-muted-foreground">
                  Drink 8 glasses of water
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="text-muted-foreground">No junk food</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
