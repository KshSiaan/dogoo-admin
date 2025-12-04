import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { EyeIcon } from "lucide-react";
import React from "react";

export default function ViewChallange({
  data,
}: {
  data: {
    id: number;
    plan_name: string;
    duration: string;
    price: string;
    features: string[];
    active_subscribers: number;
    created_at: string;
    updated_at: string;
  };
}) {
  const dumFeats = [
    "Join challenge group & activity",
    "Only 5 habits added",
    "Only 5 Say No added",
    "Earn point 1 per work done",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Subscription Management</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 text-sm items-start">
          {/* Basic Information */}
          <div>
            <h4 className="mb-2 text-base font-semibold">Basic Information</h4>
            <div className="space-y-1.5">
              <div className="flex space-x-2">
                <p className="font-semibold">Plan Name:</p>
                <p className="text-muted-foreground">{data?.plan_name}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Duration:</p>
                <p className="text-muted-foreground">{data?.duration}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Price:</p>
                <p className="text-muted-foreground">{data?.price}</p>
              </div>
              <div className="flex space-x-2">
                <p className="font-semibold">Active Subscribers:</p>
                <p className="text-muted-foreground">
                  {data.active_subscribers}
                </p>
              </div>
              <Separator className="my-4" />
              <div>
                <p className="font-semibold">Basic Features:</p>
                <p className="text-muted-foreground space-x-2 space-y-2 pt-2">
                  {dumFeats.map((x) => (
                    <Badge variant={"secondary"} key={x}>
                      {x}
                    </Badge>
                  ))}
                </p>
              </div>
              <div>
                <p className="font-semibold">Additional Features:</p>
                <p className="text-muted-foreground space-x-2 space-y-2 pt-2">
                  {data?.features.map((x) => (
                    <Badge variant={"secondary"} key={x}>
                      {x}
                    </Badge>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
