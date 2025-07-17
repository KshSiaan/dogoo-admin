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
import PPUpdate from "./pp-update";
import Feedback from "./feedback";

export default function Contact() {
  return (
    <div>
      <Card>
        <CardContent>
          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Customer Support
            </h2>

            <div className="flex justify-between items-center py-2">
              <Label className="">Email</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <PPUpdate />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="">Phone</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <PPUpdate />
                </DialogContent>
              </Dialog>
            </div>
          </section>

          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">Feedback</h2>
            <div className="flex justify-between items-center py-2">
              <Label className="">Send us your feedback</Label>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    Submit Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <Feedback />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="">Rate our app</Label>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    Rate Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <Feedback />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </CardContent>
        <CardFooter className="justify-end! gap-2">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
