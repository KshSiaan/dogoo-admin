"use client";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import { type Icon } from "@tabler/icons-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight, SlidersHorizontalIcon } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | Icon;
  }[];
}) {
  const pathname = usePathname();

  const settingsChilds = [
    { title: "Personal Profile", to: "/profile" },
    { title: "About Us", to: "/about" },
    { title: "Data privacy", to: "/privacy" },
    { title: "Terms & Conditions", to: "/tnc" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  size="lg"
                  asChild
                  className={
                    isActive
                      ? "bg-foreground/90 text-background rounded-lg font-semibold"
                      : ""
                  }
                >
                  <Link href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          <Collapsible
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={"Settings"}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontalIcon />
                  <span>Settings</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {settingsChilds.map((x) => {
                    const isActive = pathname === x.to;
                    return (
                      <SidebarMenuSubItem key={x.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={
                            isActive
                              ? "bg-foreground! rounded-lg font-semibold"
                              : ""
                          }
                        >
                          <Link href={x.to} className="block w-full">
                            <span>{x.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
