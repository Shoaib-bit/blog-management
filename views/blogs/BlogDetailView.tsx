"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/types";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogDetailViewProps {
  blog: Blog;
}

export const BlogDetailView = ({ blog }: BlogDetailViewProps) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-4">
            {blog.title}
          </CardTitle>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{blog.createdAt}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
