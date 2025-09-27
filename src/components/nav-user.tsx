"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const [{ token }] = useCookies(["token"]);
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: (): idk => {
      return getProfileApi(token);
    },
  });
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={data?.data?.user.avatar_url} alt={user.name} />
            <AvatarFallback className="rounded-lg">DG</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {data?.data?.user?.full_name}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {data?.data?.user?.email}
            </span>
          </div>
          {/* <IconDotsVertical className="ml-auto size-4" /> */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
