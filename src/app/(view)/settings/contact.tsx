import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

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
              <Button
                variant="ghost"
                className="font-bold text-lime-600"
                disabled
              >
                Edit
              </Button>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="">Phone</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Edit
              </Button>
            </div>
          </section>

          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">Feedback</h2>
            <div className="flex justify-between items-center py-2">
              <Label className="">Send us your feedback</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Submit Feedback
              </Button>
            </div>
            <div className="flex justify-between items-center py-2">
              <Label className="">Rate our app</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Rate Now
              </Button>
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
