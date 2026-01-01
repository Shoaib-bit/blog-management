import { Header } from "@/components/Header";
import React from "react";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="w-full">
        <Header />
        <div className="w-full max-w-7xl mx-auto p-6">{children}</div>
      </div>
    </Providers>
  );
}
