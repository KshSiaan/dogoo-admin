"use client";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { route } from "@/lib/route";

export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="flex flex-col justify-start h-(--header-height) shrink-0 items-center gap-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 lg:gap-2 pt-6">
        <h1 className="text-xs font-medium text-muted-foreground">
          Pages /{" "}
          <span className="text-foreground">
            {
              route.navMain.find((x) => {
                return path === x.url;
              })?.title
            }
          </span>
        </h1>
        <div className="ml-auto flex items-center gap-2 mr-4">
          <Avatar>
            <AvatarImage src={``} />
            <AvatarFallback className="text-xs font-semibold">
              LN
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full space-y-1">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm font-semibold">
          Welcome back, Admin! Here&apos;s what&apos;s happening with your
          platform today.
        </p>
      </div>
    </header>
  );
}
