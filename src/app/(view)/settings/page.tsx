import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, SearchIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PP from "./pp";
import Contact from "./contact";
import About from "./about";
import Guide from "./guide";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>All Settings</CardTitle>
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
          <TabsTrigger value="active">Personal Profile</TabsTrigger>
          <TabsTrigger value="upcoming">Contact Us</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="upcomings">How It Works</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <PP />
        </TabsContent>
        <TabsContent value="upcoming">
          <Contact />
        </TabsContent>
        <TabsContent value="about">
          <About />
        </TabsContent>
        <TabsContent value="upcomings">
          <Guide />
        </TabsContent>
      </Tabs>
    </>
  );
};
