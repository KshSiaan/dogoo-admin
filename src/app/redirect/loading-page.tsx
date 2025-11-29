"use client";

import Image from "next/image";

export default function LoadingPage() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Image
            src={"/icon.png"}
            height={128}
            width={128}
            alt="dogoo-icon"
            className="size-18 shadow rounded"
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg md:text-xl text-foreground font-medium text-center text-balance">
            Opening app…
          </p>
          <p className="text-sm md:text-base text-muted-foreground text-center">
            If you are not redirected,{" "}
            <a
              href="https://example.com"
              className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              click here
            </a>
            .
          </p>
        </div>

        {/* Animated loading dots */}
        <div className="flex gap-2 items-center justify-center mt-8">
          <div
            className="w-2 h-2 rounded-full bg-foreground animate-pulse"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-foreground animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-foreground animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </main>
  );
}
