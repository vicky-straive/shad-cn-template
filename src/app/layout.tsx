"use client";

import { Inter } from "next/font/google";
import RecoilRoot from "@/app/services/recoil/recoil-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "../../auth-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RecoilRoot>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
