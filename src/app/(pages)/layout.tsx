"use client";
import { ApolloProvider } from "@apollo/client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import client from "../apollo/client/client";
import Navbar from "../components/ui/custom-navbar";
import { navItems } from "../constants/navItems";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("token");
    setToken(!!loggedInStatus); // Convert string to boolean
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar navItems={navItems} token={token} />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
