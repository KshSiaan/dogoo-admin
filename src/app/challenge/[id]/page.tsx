import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
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

import DownloadContent from "./download-content";
import { getViewGroupApi } from "@/lib/api/extra";

// Metadata for dynamic pages
export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await getViewGroupApi({ id: params.id });
  const challenge = res.data?.[0];

  if (!challenge) {
    return {
      title: "Challenge Not Found",
    };
  }

  return {
    title: challenge.group_name,
    openGraph: {
      title: challenge.group_name,
      description: `${challenge.challenge_type} challenge on DooGoo`,
      images: [
        {
          url: `https://dashboard.doogoohabits.com/og/challenge-${challenge.id}.png`,
        },
      ],
      url: `https://dashboard.doogoohabits.com/challenge/${challenge.id}`,
    },
    other: {
      refresh: `0; url=doogoo://challenge/${challenge.id}`, // app deep link
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await getViewGroupApi({ id });
  const data = res.data;

  if (!data || data.length === 0) return notFound();

  return (
    <main className="flex flex-col justify-center items-center p-6">
      <Image
        className="select-none rounded-lg"
        height={128}
        width={128}
        alt="icon"
        draggable={false}
        src="/icon.png"
        // onContextMenu={(e) => e.preventDefault()}
      />

      <section className="w-full lg:w-2/3 mx-auto mt-12">
        {data.map((x) => (
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
        ))}
      </section>
    </main>
  );
}
