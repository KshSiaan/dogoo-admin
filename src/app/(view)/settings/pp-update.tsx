import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function PPUpdate() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Avatar className="size-24">
        <AvatarImage />
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
      <Button>Change Picture</Button>
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <Label>Full name</Label>
        <Input />
        <Label>Email</Label>
        <Input />
        <Label>Phone number</Label>
        <Input />
      </div>
      <div className="border-t w-full pt-4 flex flex-row justify-end items-center gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
