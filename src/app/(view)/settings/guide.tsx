import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React from "react";
import HiwModals from "./hiw-modal"; // Assuming HiwModals is the corrected component from our last interaction

export default function Guide() {
  return (
    <div>
      <Card>
        <CardContent>
          {/* User Guide */}
          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">User Guide</h2>

            <div className="flex justify-between items-center py-2">
              <Label>Creating Habits</Label>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Creating Habits</DialogTitle>
                  </DialogHeader>
                  <HiwModals type="creatingHabit" /> {/* Corrected type */}
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Tracking Progress</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Tracking Progress</DialogTitle>
                  </DialogHeader>
                  <HiwModals type="trackingProgress" /> {/* Corrected type */}
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Setting Reminders</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Setting Reminders</DialogTitle>
                  </DialogHeader>
                  <HiwModals type="settingReminders" /> {/* Corrected type */}
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Streaks & Rewards</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Streaks & Rewards</DialogTitle>
                  </DialogHeader>
                  <HiwModals type="streaksRewards" /> {/* Corrected type */}
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* FAQs */}
          <section className="pb-2">
            <h2 className="text-xl font-semibold border-b pb-2">FAQs</h2>

            <div className="flex justify-between items-center py-2">
              <Label>Common Questions</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>FAQs</DialogTitle>
                  </DialogHeader>
                  <HiwModals type="faqs" /> {/* Corrected type */}
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Troubleshooting</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Troubleshooting Help</DialogTitle>
                  </DialogHeader>
                  <HiwModals type="troubleshootingHelp" />{" "}
                  {/* Corrected type */}
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
