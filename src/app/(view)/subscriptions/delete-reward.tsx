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
import { TrashIcon } from "lucide-react";
import React from "react";

export default function DeleteChallange() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b px-0! pb-2">
          <DialogTitle>Delete Premium Yearly</DialogTitle>
        </DialogHeader>
        <p className="py-4 text-sm">
          Are you sure you want to delete the &quot;Premium Yearly&quot; plan?
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
