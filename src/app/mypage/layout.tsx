"use client";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import AppLayout from "@/components/layout/MobileLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AppLayout>
          <Header />
          {children}
          <Navigation />
        </AppLayout>
      </body>
    </html>
  );
}
