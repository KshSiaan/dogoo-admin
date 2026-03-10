"use client";
import { getPrivacyApi } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["privacy"],
    retry: false,
    queryFn: () => getPrivacyApi({ token: undefined }),
  });

  const lastUpdated = data?.data?.updated_at
    ? new Date(data.data.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <main className="min-h-screen bg-black text-gray-200 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center">
            Please create a privacy policy first in the admin panel.
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              {data?.data?.title || "Privacy Policy"}
            </h1>
            <p className="text-sm text-gray-400 mb-8">
              Last updated: {lastUpdated}
            </p>

            {data?.data?.content ? (
              <article
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 leading-relaxed text-gray-200
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-4
                  [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-3
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mb-3
                  [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1
                  [&_a]:text-indigo-400 [&_a]:underline hover:[&_a]:text-indigo-300"
                dangerouslySetInnerHTML={{ __html: data.data.content }}
              />
            ) : (
              <p className="text-center text-gray-400">
                No privacy policy content found.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
