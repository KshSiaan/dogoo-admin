"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardInfoApi } from "@/lib/api/admin";
import { IconPackages, IconUsersGroup } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, DollarSignIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import { Skeleton } from "./ui/skeleton";
import { idk } from "@/lib/utils";

export function SectionCards() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["dashboard_cards"],
    queryFn: (): idk => {
      return getDashboardInfoApi({ token });
    },
  });
  if (isPending) {
    return <div className="grid grid-cols-4 gap-6">{Array(4).fill("")}</div>;
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <Card className="flex flex-row justify-start items-start px-4 py-4!">
          <div className="flex items-center h-full">
            <div className="rounded-lg aspect-square! p-2 bg-blue-500 text-background">
              <IconUsersGroup />
            </div>
          </div>
          <CardContent className="p-0!">
            <CardDescription className="text-foreground font-medium">
              Total Users
            </CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {data.data.total_users}
            </CardTitle>
            <CardDescription>
              <span className="text-teal-600">{data.data.from_yesterday}</span>{" "}
              from yesterday
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex flex-row justify-start items-start px-4 py-4!">
          <div className="flex items-center h-full">
            <div className="rounded-lg aspect-square! p-2 bg-green-700 text-background">
              <IconPackages />
            </div>
          </div>
          <CardContent className="p-0!">
            <CardDescription className="text-foreground font-medium">
              Total Challenge
            </CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {data.data.total_challenges}
            </CardTitle>
            <CardDescription>
              <span className="text-teal-600">{data.data.from_last_week} </span>{" "}
              from last week
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex flex-row justify-start items-start px-4 py-4!">
          <div className="flex items-center h-full">
            <div className="rounded-lg aspect-square! p-2 bg-amber-500 text-background">
              <DollarSignIcon />
            </div>
          </div>
          <CardContent className="p-0!">
            <CardDescription className="text-foreground font-medium">
              Total Revenue
            </CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {data.data.total_revenues}
            </CardTitle>
            <CardDescription>
              <span className="text-teal-600">
                {data.data.form_last_week_revenues}
              </span>{" "}
              from Last week
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex flex-row justify-start items-start px-4 py-4!">
          <div className="flex items-center h-full">
            <div className="rounded-lg aspect-square! p-2 bg-rose-700 text-background">
              <CheckIcon />
            </div>
          </div>
          <CardContent className="p-0!">
            <CardDescription className="text-foreground font-medium">
              Challenge Completion Rate
            </CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {data.data.challenge_completion_rate}
            </CardTitle>
            <CardDescription>
              <span className="text-teal-600">
                {data.data.total_challenge_completed}
              </span>{" "}
              new challenge completed
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
