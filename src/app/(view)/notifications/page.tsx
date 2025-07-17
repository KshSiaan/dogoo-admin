import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>Notifications</CardTitle>
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
        <div className="mt-4 text-sm font-medium flex items-center justify-between w-full">
          <p>Showing 1 to 5 of 112 entries </p>
          <div className="">
            <Pagination className="w-fit ">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  );
}

const Users = () => {
  return (
    <>
      <Tabs defaultValue={"active"} className="mb-6">
        <TabsList>
          <TabsTrigger value="active">All</TabsTrigger>
          <TabsTrigger value="upcoming">Read</TabsTrigger>
          <TabsTrigger value="completed">Unread</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="w-full flex justify-between items-center">
              <CardTitle className="text-sm">
                New Challenge: 30-Day Fitness Blast is Live!
              </CardTitle>
              <p className="text-xs">10m ago</p>
            </CardHeader>
            <CardContent className="flex justify-between items-end">
              <CardDescription>
                Admin just added a new challenge for all users. Start your
                journey today!
              </CardDescription>
              <div className="">
                <div className="size-2.5 rounded-full bg-blue-400"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
