import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/generalComponents/navbar";
import { Provider } from "jotai";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym App",
  description: "Experimental Gym App for tracking your fitness progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {/* <Provider> */}
        <main className="flex flex-col items-center w-full">{children}</main>
        {/* </Provider> */}
      </body>
    </html>
  );
}
