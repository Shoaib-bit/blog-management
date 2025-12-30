"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CreateView = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <Button onClick={() => router.back()}>
        <ArrowBigLeft />
        Back
      </Button>

      <h3 className="mt-3 text-2xl font-blod">Create new blog</h3>

      <div className="mt-4 flex flex-col gap-3">
        <div className="grid gap-2">
          <Label htmlFor="name">Title</Label>
          <Input id="name" type="text" placeholder="Enter Title" />
        </div>
      </div>
    </div>
  );
};
