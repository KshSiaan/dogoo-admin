import { IconUsers } from "@tabler/icons-react";
import {
  BellIcon,
  ChartAreaIcon,
  ClockArrowDownIcon,
  LayoutDashboardIcon,
  PackageIcon,
  SlidersHorizontalIcon,
  TruckIcon,
} from "lucide-react";

export const route = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "User Management",
      url: "/users",
      icon: IconUsers,
    },
    {
      title: "Challenge Management",
      url: "/challanges",
      icon: PackageIcon,
    },
    {
      title: "Reward Management",
      url: "/rewards",
      icon: TruckIcon,
    },
    {
      title: "Subscription Management",
      url: "/subscriptions",
      icon: ClockArrowDownIcon,
    },
    {
      title: "Analytics & Reports",
      url: "/analytics",
      icon: ChartAreaIcon,
    },

    {
      title: "Notifications",
      url: "/notifications",
      icon: BellIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SlidersHorizontalIcon,
    },
  ],
};