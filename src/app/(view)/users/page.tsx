import React, { Suspense } from "react";

import Users from "./users";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <main className="py-6 h-full">
      <section className="h-full">
        <Suspense fallback={<Loader />}>
          <Users />
        </Suspense>
      </section>
    </main>
  );
}

function Loader() {
  return (
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>
  );
}
