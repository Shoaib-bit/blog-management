"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteBlogApi } from "../blog.utils";
import { toast } from "sonner";
import { useState } from "react";

interface BlogCardProps {
  blog: Blog;
  onDelete?: (blogId: string) => void;
}

export const BlogCard = ({ blog, onDelete }: BlogCardProps) => {
  const { user } = useAuth();
  const isAuthor = user?.id === blog.author.id;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit blog:", blog.id);
  };

  const handleDeleteClick = () => {
    setIsPopoverOpen(false);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBlogApi(blog.id);
      toast.success("Blog deleted successfully");
      setIsDialogOpen(false);
      onDelete?.(blog.id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="mb-4 transition-all duration-200 cursor-pointer hover:border-primary relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-4xl">{blog.title}</CardTitle>
          {isAuthor && (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-1 -mr-2"
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDeleting}
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2" align="end">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick();
                    }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div
            className={`text-gray-600 prose max-w-none overflow-hidden transition-all duration-300 max-h-50`}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{blog.title}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
