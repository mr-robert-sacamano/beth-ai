import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";

const dynapuff = DynaPuff({
  variable: "--font-dynapuff",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dynapuff.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
