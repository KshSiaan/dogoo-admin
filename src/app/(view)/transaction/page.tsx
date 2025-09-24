import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Plan from "./plan";
import { Select } from "@/components/ui/select";
export default function Page() {
  return (
    <main className="py-6">
      <section className="">
        <Card>
          <CardHeader className="flex items-center justify-between border-b">
            <CardTitle>Transaction</CardTitle>
            <Select></Select>
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
        <Plan />
      </div>
    </>
  );
};
