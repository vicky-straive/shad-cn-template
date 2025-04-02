import { Inter } from "next/font/google";
import { Metadata } from "next";
import { RecoilProvider } from "@/app/services/recoil/recol-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "../../auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemePicker } from "@/components/theme-picker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Template",
  description: "A comprehensive Next.js template with shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RecoilProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <header className="fixed top-0 right-0 p-4 z-50">
                <ThemePicker />
              </header>
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
