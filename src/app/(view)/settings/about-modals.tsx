import { Button } from "@/components/ui/button";
import React from "react";

export default function HiwModals({
  type,
}: {
  type: "tnc" | "privacy" | "licenses";
}) {
  return (
    <div className="">
      {type === "tnc" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Terms of Service</p>
          <p>Here are our terms of services...</p>
          <ol className="mt-6">
            <li>You agree to use this service responsibly</li>
            <li>You will not misuse the platform</li>
            <li>All transactions are final</li>
            <li>We reserve the right to terminate accounts</li>
          </ol>
        </div>
      ) : type === "privacy" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Privacy Policy</p>
          <p>We respect your privacy</p>
          <ol className="mt-6">
            <li>We collect minimal data required for service</li>
            <li>Your data is encrypted and secured</li>
            <li>We don&apos;t sell your information</li>
            <li>You can request data deletion</li>
          </ol>
        </div>
      ) : type === "licenses" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Software Licenses</p>
          <p>This product uses the following open source software:</p>
          <ol className="mt-6">
            <li>ReactJs - MIT License</li>
            <li>Bootstrap - MIT License</li>
            <li>Font Awesome - CC BY 4.0 License</li>
          </ol>
        </div>
      ) : (
        ""
      )}
      <div className="border-t w-full pt-4 flex flex-row justify-end items-center gap-2">
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
