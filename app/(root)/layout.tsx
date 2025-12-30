import { Header } from "@/components/Header";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full max-w-7xl mx-auto p-6">{children}</div>
    </div>
  );
}
