import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Doogoo - Authenticate",
  description: "DOGOO Login",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    return redirect("/");
  }
  return (
    <main className="h-dvh w-dvw flex justify-center items-center bg-[#FEFFF2]">
      {children}
    </main>
  );
}
