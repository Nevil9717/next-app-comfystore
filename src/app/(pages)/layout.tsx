"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { navItems } from "../constants/navItems";
import Navbar from "../components/ui/custom-navbar";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar navItems={navItems} />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
