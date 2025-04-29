import "./globals.css";
import { JSX } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Simple habit tracking app for daily routine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ClientSessionProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </ClientSessionProvider>
    </html>
  );
}
