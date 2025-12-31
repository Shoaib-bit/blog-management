"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BlogListHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Blogs List</h2>
        <p className="text-sm text-gray-500">
          Explore all the blogs created by our community
        </p>
      </div>

      <Button onClick={() => router.push("/create")} className="cursor-pointer">
        Create
      </Button>
    </div>
  );
};
