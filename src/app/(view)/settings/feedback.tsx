import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Feedback() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="">
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>
            We’d love to hear your thoughts about our service!
          </CardDescription>
        </div>
        <Label>Current Password</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compliment">Compliment</SelectItem>
          </SelectContent>
        </Select>
        <Label>New Password</Label>
        <Textarea placeholder="Please share your feedback here...." />
      </div>
      <div className="border-t w-full pt-4 flex flex-row justify-end items-center gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
