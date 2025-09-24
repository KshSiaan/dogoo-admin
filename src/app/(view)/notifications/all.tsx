import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function All() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="w-full flex justify-between items-center">
            <CardTitle className="text-sm">
              New Challenge: 30-Day Fitness Blast is Live!
            </CardTitle>
            <p className="text-xs">10m ago</p>
          </CardHeader>
          <CardContent className="flex justify-between items-end">
            <CardDescription>
              Admin just added a new challenge for all users. Start your journey
              today!
            </CardDescription>
            <div className="">
              <div className="size-2.5 rounded-full bg-blue-400"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
