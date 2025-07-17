import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

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
              <Button variant="ghost" className="font-bold text-lime-600">
                View
              </Button>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Privacy Policy</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                View
              </Button>
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
              <Button variant="ghost" className="font-bold text-lime-600">
                View
              </Button>
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
