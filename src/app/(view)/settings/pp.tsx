import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

export default function PP() {
  return (
    <div>
      <Card>
        <CardContent>
          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Profile Information
            </h2>

            <div className="flex justify-between items-center py-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border"
                  />
                </Avatar>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Change
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Full Name</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Liam Nickson
                </span>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  liam.nickson@email.com
                </span>
                <Button
                  variant="ghost"
                  className="font-bold text-lime-600"
                  disabled
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Phone Number</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  +1 555-987-6543
                </span>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Edit
                </Button>
              </div>
            </div>
          </section>

          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">Security</h2>

            <div className="flex justify-between items-center py-2">
              <Label>Password</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  ********
                </span>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Change
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Two-Factor Authentication</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Enabled
                </span>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Edit
                </Button>
              </div>
            </div>
          </section>

          <section className="pb-6">
            <h2 className="text-xl font-semibold border-b pb-2">Others</h2>

            <div className="flex justify-between items-center py-2">
              <Label>Language</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  English (US)
                </span>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Change
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <Label>Notification Preferences</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Email & Push
                </span>
                <Button variant="ghost" className="font-bold text-lime-600">
                  Edit
                </Button>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
