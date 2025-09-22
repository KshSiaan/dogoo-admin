import { Button } from "@/components/ui/button";
import React from "react";

export default function HiwModals({
  type,
}: {
  type:
    | "tnc"
    | "privacy"
    | "licenses"
    | "creatingHabit"
    | "trackingProgress"
    | "settingReminders"
    | "streaksRewards"
    | "faqs"
    | "troubleshootingHelp";
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
      ) : type === "creatingHabit" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Creating Habit</p>
          <p>To create a new habit:</p>
          <ol className="mt-6">
            <li>Tap on &quot;+&quot; &quot;Add Habit&quot;</li>
            <li>Enter the habit name and choose a category</li>
            <li>Set the frequency (daily, weekly, custom)</li>
            <li>Add optional notes or goals</li>
            <li>Save to start tracking</li>
          </ol>
        </div>
      ) : type === "trackingProgress" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Tracking Progress</p>
          <p>To track your daily habits:</p>
          <ol className="mt-6">
            <li>Open the app and go to the Dashboard</li>
            <li>Tap on the habit you completed</li>
            <li>View progress using daily/weekly/monthly charts</li>
            <li>Analyze completion trends</li>
            <li>Stay consistent for better results</li>
          </ol>
        </div>
      ) : type === "settingReminders" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Setting Reminders</p>
          <p>To set habit reminders:</p>
          <ol className="mt-6">
            <li>Tap on the habit you want to edit</li>
            <li>Choose &quot;Set Reminder&quot;</li>
            <li>Pick the time and repeat schedule</li>
            <li>Enable notifications</li>
            <li>Save to activate alerts</li>
          </ol>
        </div>
      ) : type === "streaksRewards" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Streaks & Rewards</p>
          <p>To stay motivated with streaks:</p>
          <ol className="mt-6">
            <li>Complete habits on consecutive days</li>
            <li>Build streaks shown on your dashboard</li>
            <li>Unlock reward badges for milestones</li>
            <li>Track highest streak and consistency</li>
            <li>Share achievements with friends</li>
          </ol>
        </div>
      ) : type === "faqs" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Frequently Asked Questions</p>
          <ol className="mt-6">
            <li>
              <span className="font-semibold">
                Can I edit or delete a habit after creating it?
              </span>
              <br />
              Yes! Tap the habit, select the three-dot menu, then choose edit or
              delete.
            </li>
            <li>
              <span className="font-semibold">
                What happens if I miss a day?
              </span>
              <br />
              Missing a day will reset your streak for that habit, but your
              overall progress remains unaffected.
            </li>
            <li>
              <span className="font-semibold">
                Can I backdate habit entries?
              </span>
              <br />
              A: Yes, tap on the calendar icon to mark previous days if you
              forgot to log.
            </li>
          </ol>
        </div>
      ) : type === "troubleshootingHelp" ? (
        <div className="text-sm">
          <p className="text-sm font-semibold">Troubleshooting Help</p>
          <p>Having issues? Try these steps:</p>
          <ol className="mt-6">
            <li>Check your internet connection</li>
            <li>Restart the app</li>
            <li>Update to the latest version</li>
            <li>Clear app cache</li>
            <li>If problem persist, please contact our support team.</li>
          </ol>
        </div>
      ) : (
        ""
      )}
      <div className="border-t w-full pt-4 flex flex-row justify-end items-center gap-2">
        <Button variant="outline">Close</Button>{" "}
        {/* Changed to "Close" as per the image */}
      </div>
    </div>
  );
}
