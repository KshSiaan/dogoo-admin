import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function PassUpdate() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <Label>Current Password</Label>
        <Input />
        <Label>New Password</Label>
        <Input />
        <Label>Confirm New Password</Label>
        <Input />
      </div>
      <div className="border-t w-full pt-4 flex flex-row justify-end items-center gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
