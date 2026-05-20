import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2Icon, SearchIcon } from "lucide-react";
import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Plan from "./plan";
import Refund from "./refund";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddSub from "./add-sub";
import Free from "./free";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>All Subscription</CardTitle>

          </CardHeader>
          <CardContent>
            <Users />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const Users = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Tabs defaultValue={"active"} className="mb-6 w-full">
          <div className="flex w-full justify-between items-center">
            <TabsList>
              <TabsTrigger value="active">Subscription Plan</TabsTrigger>
              <TabsTrigger value="refund">Refund</TabsTrigger>
              <TabsTrigger value="free">Free Subscription</TabsTrigger>
            </TabsList>

          </div>
          <TabsContent value="active">
                       <div className="flex justify-end">
                         <Dialog>
              <DialogTrigger asChild>
                <Button>Add Subscription</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add new Subscription</DialogTitle>
                </DialogHeader>
                <AddSub />
              </DialogContent>
            </Dialog>
                       </div>
            <Suspense
              fallback={
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              }
            >
              <Plan />
            </Suspense>
          </TabsContent>
          <TabsContent value="refund">
            <Suspense
              fallback={
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              }
            >
              <Refund />
            </Suspense>
          </TabsContent>
          <TabsContent value="free">
            <Suspense
              fallback={
                <div
                  className={`flex justify-center items-center h-24 mx-auto`}
                >
                  <Loader2Icon className={`animate-spin`} />
                </div>
              }
            >
              <Free />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
