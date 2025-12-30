"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Blogs List</h2>
        <p className="text-sm text-gray-500">List of all your blogs</p>
      </div>

      <Button onClick={() => router.push("/create")} className="cursor-pointer">
        Create
      </Button>
    </div>
  );
};

export default Header;
