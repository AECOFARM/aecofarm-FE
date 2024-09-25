"use client";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import AppLayout from "@/components/layout/MobileLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      <Header />
      {children}
    </AppLayout>
  );
}
