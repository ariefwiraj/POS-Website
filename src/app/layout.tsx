import type { Metadata } from "next";
import { Rubik, Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS Toko Sembako",
  description: "Sistem Kasir Toko Sembako",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body
        className={`${nunitoSans.variable} ${rubik.variable} font-sans antialiased h-full`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
