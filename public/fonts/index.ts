import localFont from "next/font/local";
// import { subset } from 'semver';

export const aecofarmFont = localFont({
  variable: "--font-aecofarm",
  src: [
    {
      path: "./SpoqaHanSansNeo-Bold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./SpoqaHanSansNeo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./SpoqaHanSansNeo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SpoqaHanSansNeo-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
});
