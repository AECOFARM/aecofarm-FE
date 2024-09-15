"use client";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "../globals.css";
import AppLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/TopBar";

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
