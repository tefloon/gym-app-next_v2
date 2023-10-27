import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { store } from "@/redux/setupStore";
import { Provider } from "react-redux";
import FooterRedux from "@/components/footerRedux";

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
        <main className="flex flex-col items-center w-full">{children}</main>
      </body>
    </html>
  );
}
