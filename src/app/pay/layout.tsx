"use client";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import MainLayout from "@/components/layout/MainLayout";
import AppLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/TopBar";

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
          <TopBar text="상품 결제하기" />
          {children}
          <Navigation />
        </AppLayout>
      </body>
    </html>
  );
}
