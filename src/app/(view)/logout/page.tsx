"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import { LogOut, LogOutIcon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const navig = useRouter();
  const [, , removeCookie] = useCookies(["token"]);
  return (
    <div className="fixed top-0 left-0 h-dvh w-dvw z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <Dialog
        open
        onOpenChange={() => {
          navig.back();
        }}
      >
        <DialogContent className="sm:max-w-[420px] rounded-2xl border border-border shadow-xl bg-background/95 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <DialogHeader className="text-center space-y-2">
              <div className="flex justify-center mb-2">
                <LogOutIcon className="w-10 h-10 text-destructive" />
              </div>
              <DialogTitle className="text-2xl font-semibold">
                Log out?
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                You’ll be signed out from your current session. Don’t worry, you
                can always log back in later.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex sm:flex-row flex-col sm:justify-end gap-3 mt-6">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navig.back()}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  removeCookie("token");
                  navig.push("/login");
                }}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
