"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const CreateBlogHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Create Blog</h2>
        <p className="text-sm text-gray-500">
          Share your thoughts and ideas with the world
        </p>
      </div>

      <Button onClick={() => router.back()} className="cursor-pointer">
        Back
      </Button>
    </div>
  );
};
