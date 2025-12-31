"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CreateBlogHeaderProps {
  isEditMode?: boolean;
}

export const CreateBlogHeader = ({
  isEditMode = false,
}: CreateBlogHeaderProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Blog" : "Create Blog"}
        </h2>
        <p className="text-sm text-gray-500">
          {isEditMode
            ? "Update your blog post"
            : "Share your thoughts and ideas with the world"}
        </p>
      </div>

      <Button onClick={() => router.back()} className="cursor-pointer">
        Back
      </Button>
    </div>
  );
};
