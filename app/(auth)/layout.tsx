import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full py-15  min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
