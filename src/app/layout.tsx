import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { NavMenu } from "@/components/NavMenu";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col bg-background">
              <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <NavMenu />
              </header>
              <main className="container flex flex-col justify-center items-center">
                <div className="relative py-6 lg:gap-10 lg:py-8 xl:grid">
                  {children}
                  <Toaster richColors position="top-center" />
                </div>
              </main>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
