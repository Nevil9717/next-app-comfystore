"use client";
import { Inter } from "next/font/google";
import AdminSidebar from "../../../components/ui/adminSidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <AdminSidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
