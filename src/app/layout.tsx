import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TanstackProvider from "@/provider/query-provider";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Doogoo - Admin",
  description: "DOGOO Control panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            {children}
            <Toaster />
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
