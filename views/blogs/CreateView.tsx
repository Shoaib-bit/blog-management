"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateBlogHeader } from "./components";

export const CreateView = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <CreateBlogHeader />

      <div className="mt-4 flex flex-col gap-3">
        <div className="grid gap-2">
          <Label htmlFor="name">Title</Label>
          <Input id="name" type="text" placeholder="Enter Title" />
        </div>
      </div>
    </div>
  );
};
