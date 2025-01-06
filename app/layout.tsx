import GrainyBackground from "@/components/grainy-background";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Hooks Library - Modern Hooks for Modern Applications",
  description: "A comprehensive collection of React hooks for building better applications",
  keywords: "react, hooks, typescript, nextjs, development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GrainyBackground>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
              {children}
            </div>
          </GrainyBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
