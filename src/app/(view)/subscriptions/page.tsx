import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Plan from "./plan";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddSub from "./add-sub";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>All Subscription</CardTitle>
            <div
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-fit min-w-0 rounded-md border bg-transparent px-3 items-center text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
            >
              <SearchIcon className="text-muted-foreground" />
              <Input
                className="outline-none! border-none! ring-0! shadow-none! py-0"
                placeholder="Search.."
              />
            </div>
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
            </TabsList>
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
          <TabsContent value="active">
            <Plan />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
