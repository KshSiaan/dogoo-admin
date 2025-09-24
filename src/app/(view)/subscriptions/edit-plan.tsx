"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

export default function EditPlan({ price }: { price: string }) {
  const [currPrice, setCurrPrice] = useState<string>(price ?? "");
  useEffect(() => {
    if (price) {
      setCurrPrice(price);
    }
  }, [price]);
  return (
    <>
      <div className="space-y-3">
        <Label>Price you want to set:</Label>
        <Input
          type="number"
          min={0}
          value={currPrice}
          onChange={(e) => {
            setCurrPrice(e.target.value);
          }}
        />
      </div>

      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <Button>Save</Button>
      </DialogFooter>
    </>
  );
}
