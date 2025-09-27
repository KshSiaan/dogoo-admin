"use client";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { route } from "@/lib/route";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";

export function SiteHeader() {
  const path = usePathname();
  const [{ token }] = useCookies(["token"]);
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: (): idk => {
      return getProfileApi(token);
    },
  });
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
            <AvatarImage src={data?.data?.user?.avatar_url} />
            <AvatarFallback className="text-xs font-semibold">
              DG
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
