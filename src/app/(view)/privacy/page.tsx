"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useEffect, useState } from "react";

import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPrivacyApi, updatePrivacyApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [title, setTitle] = useState<string>("");
  const [privacy, setPrivacy] = useState<idk>();
  const { data, isPending } = useQuery({
    queryKey: ["privacy"],
    queryFn: (): idk => {
      return getPrivacyApi({ token });
    },
  });
  const { mutate, isPending: saving } = useMutation({
    mutationKey: ["update_privacy"],
    mutationFn: (body: { title: string; content: idk }) => {
      return updatePrivacyApi({ token, body });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });

  useEffect(() => {
    if (!isPending) {
      setPrivacy(data.data.content);
      setTitle(data.data.title);
    }
  }, [isPending]);

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
            onChange={(x) => {
              setTitle(x.target.value);
            }}
          />
          <Editor
            className=""
            style={{ minHeight: "300px" }}
            value={privacy}
            onTextChange={(e) => setPrivacy(e.htmlValue)}
          />
        </CardContent>
        <CardFooter className="flex w-full justify-end">
          <Button
            disabled={saving}
            onClick={() => {
              if (title && privacy) {
                mutate({
                  title,
                  content: privacy,
                });
              }
            }}
          >
            {saving ? "Updating" : "Update"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
