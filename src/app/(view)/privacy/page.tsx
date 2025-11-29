"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "primereact/editor";
import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getPrivacyApi, updatePrivacyApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils"; // assuming this is a type alias like `any`

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [title, setTitle] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");

  // ✅ Fetch existing privacy data
  const { data, isPending } = useQuery({
    queryKey: ["privacy"],
    queryFn: async (): Promise<idk> => {
      return await getPrivacyApi({ token });
    },
  });

  // ✅ Update mutation
  const { mutate, isPending: saving } = useMutation({
    mutationKey: ["update_privacy"],
    mutationFn: async (body: { title: string; content: string }) => {
      return await updatePrivacyApi({ token, body });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Updated successfully!");
    },
  });

  // ✅ Set form values after data loads
  useEffect(() => {
    if (data?.data) {
      setPrivacy(data.data.content ?? "");
      setTitle(data.data.title ?? "");
    }
  }, [data, isPending]);

  return (
    <main className="py-6 h-full">
      <Card className="h-full">
        <CardHeader className="border-b">
          <CardTitle>Data Privacy</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Editor
            style={{ minHeight: "300px" }}
            value={privacy}
            onTextChange={(e) => setPrivacy(e.htmlValue || "")}
          />
        </CardContent>

        <CardFooter className="flex w-full justify-end">
          <Button
            disabled={saving || !title || !privacy}
            onClick={() => {
              mutate({ title, content: privacy });
            }}
          >
            {saving ? "Updating..." : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
