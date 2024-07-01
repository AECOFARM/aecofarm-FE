"use client"
import Header from '@/components/Header';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { aecofarmFont } from "@/app/fonts";
import Navigation from '@/components/Navigation';
import AppLayout from '@/components/layout/MobileLayout';

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
