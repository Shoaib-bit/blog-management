import { Header } from "@/components/Header";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">
        <Header />
        <div className="w-full max-w-7xl mx-auto p-6">{children}</div>
      </div>
    </QueryClientProvider>
  );
}
