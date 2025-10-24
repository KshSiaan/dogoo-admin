"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { getTncApi, updateTncApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // ✅ Fetch T&C data
  const { data, isPending } = useQuery({
    queryKey: ["tnc"],
    queryFn: async (): Promise<idk> => {
      return await getTncApi({ token });
    },
  });

  // ✅ Mutation to update T&C
  const { mutate, isPending: saving } = useMutation({
    mutationKey: ["update_tnc"],
    mutationFn: async (body: { title: string; content: string }) => {
      return await updateTncApi({ token, body });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Updated successfully!");
    },
  });

  // ✅ Populate fields once data is ready
  useEffect(() => {
    if (data?.data) {
      setTitle(data.data.title ?? "");
      setContent(data.data.content ?? "");
    }
  }, [data, isPending]);

  return (
    <main className="py-6 h-full">
      <Card className="h-full">
        <CardHeader className="border-b">
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Editor
            style={{ minHeight: "300px" }}
            value={content}
            onTextChange={(e) => setContent(e.htmlValue || "")}
          />
        </CardContent>

        <CardFooter className="flex w-full justify-end">
          <Button
            disabled={saving || !title || !content}
            onClick={() => mutate({ title, content })}
          >
            {saving ? "Updating..." : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
