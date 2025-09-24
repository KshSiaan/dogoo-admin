"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="py-6 h-full">
      <Card className="h-full">
        <CardHeader className="border-b">
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Editor className="" style={{ minHeight: "300px" }} />
        </CardContent>
        <CardFooter className="flex w-full justify-end">
          <Button>Update</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
