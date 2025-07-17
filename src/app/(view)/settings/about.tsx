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
import AboutModals from "./about-modals";

export default function About() {
  return (
    <div>
      <Card>
        <CardContent>
          {/* Profile Information */}
          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Profile Information
            </h2>

            <div className="flex justify-between items-center py-2">
              <Label>App Version</Label>
              <div className="font-bold text-lime-600/80 text-sm px-4">
                2.4.1
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Terms of Service</Label>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <AboutModals type="tnc" />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Privacy Policy</Label>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Privacy policy</DialogTitle>
                  </DialogHeader>
                  <AboutModals type="privacy" />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Careers</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                View Opening
              </Button>
            </div>
          </section>

          {/* Legal */}
          <section className="pb-2">
            <h2 className="text-xl font-semibold border-b pb-2">Legal</h2>

            <div className="flex justify-between items-center py-2">
              <Label>Licenses</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="font-bold text-lime-600">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="border-b pb-2">
                    <DialogTitle>Software Licenses</DialogTitle>
                  </DialogHeader>
                  <AboutModals type="licenses" />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Copyright</Label>
              <span className="text-sm font-semibold text-muted-foreground">
                © 2025 Delivery Inc.
              </span>
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
