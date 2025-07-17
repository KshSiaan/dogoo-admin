import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

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
              <Button variant="ghost" className="font-bold text-lime-600">
                Learn More
              </Button>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Tracking Progress</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Learn More
              </Button>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Setting Reminders</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Learn More
              </Button>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Streaks & Rewards</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Learn More
              </Button>
            </div>
          </section>

          {/* FAQs */}
          <section className="pb-2">
            <h2 className="text-xl font-semibold border-b pb-2">FAQs</h2>

            <div className="flex justify-between items-center py-2">
              <Label>Common Questions</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                View All
              </Button>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Troubleshooting</Label>
              <Button variant="ghost" className="font-bold text-lime-600">
                Get Help
              </Button>
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
