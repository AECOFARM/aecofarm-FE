import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilRootProvider from "@/recoil/RecoilRootProvider";
import StyledComponentsRegistry from "@/utils/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aecofarm",
  description: "'아코팜': 대학생 물품 공유 플랫폼",
  icons: {
    icon: "/img/hand-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RecoilRootProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
