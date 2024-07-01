"use client"
import Header from '@/components/Header';
import { Inter } from "next/font/google";
import "../globals.css";
import AppLayout from '@/components/layout/MobileLayout';
import TopBar from '@/components/TopBar';

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
          <TopBar text="글쓰기" />
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
