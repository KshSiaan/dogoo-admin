"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { getViewGroupApi } from "@/lib/api/extra";
import { useQuery } from "@tanstack/react-query";
import { InboxIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import DownloadContent from "./download-content";
import { notFound, useParams } from "next/navigation";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function Page() {
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["view-grounp", params.id],
    queryFn: () => {
      return getViewGroupApi({ id: params.id as string });
    },
    enabled: !!params.id,
  });
  if (!params.id) {
    return notFound();
  }

  return (
    <main className="flex flex-col justify-center items-center p-6">
      <Image
        className="select-none rounded-lg"
        height={128}
        width={128}
        alt="icon"
        draggable={false}
        src="/icon.png"
        onContextMenu={(e) => e.preventDefault()}
      />

      <section className="w-full lg:w-2/3 mx-auto mt-12">
        {isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : isError || data?.data?.length <= 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>Challange not found</EmptyTitle>
              <EmptyContent></EmptyContent>
            </EmptyHeader>
          </Empty>
        ) : (
          data?.data?.map((x) => (
            <Card className="w-full" key={x.id}>
              <CardHeader className="flex justify-between items-center border-b">
                <CardTitle>{x.group_name}</CardTitle>
                <Badge>{x.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <div className="flex justify-between items-center text-sm pb-4">
                    <p>My Daily Progress</p>
                    <p>{x.my_daily_progress}%</p>
                  </div>
                  <Progress
                    max={100}
                    value={x.my_daily_progress}
                    className="[&>*]:bg-[#d5e022]"
                  />
                </div>
                <div className="w-full mt-12">
                  <div className="flex justify-between items-center text-sm pb-4">
                    <p>Group Daily Progress</p>
                    <p>{x.group_daily_progress}%</p>
                  </div>
                  <Progress max={100} value={x.group_daily_progress} />
                </div>
                <div className="mt-4 text-sm flex justify-between items-center">
                  <div className="flex justify-start items-center">
                    Participants:
                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                      {x.member_lists.slice(0, 4).map((y) => (
                        <Avatar key={y.id}>
                          <AvatarImage src={y.user.avatar_url} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  <div>
                    {x.members_count}/{x.max_count}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant={"outline"}>Log Progress</Button>
                  </DrawerTrigger>
                  <DownloadContent />
                </Drawer>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button>Join</Button>
                  </DrawerTrigger>
                  <DownloadContent />
                </Drawer>
              </CardFooter>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}
