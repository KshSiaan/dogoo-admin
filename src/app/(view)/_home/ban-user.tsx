import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BanIcon } from "lucide-react";
import React from "react";

export default function BanUser({ type }: { type: "ban" | "unban" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <BanIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b px-0! pb-2">
          <DialogTitle>
            {type === "ban" ? "Block User" : "Unblock User"}
          </DialogTitle>
        </DialogHeader>
        <p className="py-4 text-sm">
          Are you sure you want to {type === "ban" ? "block" : "unblock"} Liam
          Nickson?
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
