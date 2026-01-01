"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreateBlogHeader } from "./components";
import { TextEditor } from "@/components/TextEditor";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useAddBlog } from "@/hooks/useAddBlog";
import { useUpdateBlog } from "@/hooks/useUpdateBlog";
import { useGetBlogById } from "@/hooks/useGetBlog";

const blogCreateSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup
    .string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
});

type BlogCreateFormData = yup.InferType<typeof blogCreateSchema>;

interface CreateViewProps {
  blogId?: string;
}

export const CreateView = ({ blogId }: CreateViewProps) => {
  const router = useRouter();
  const isEditMode = !!blogId;

  const { data: blogData, isLoading: fetchingBlog } = useGetBlogById(
    blogId || "",
    isEditMode
  );
  const { mutate: createBlog, isPending: isCreating } = useAddBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();

  const loading = isCreating || isUpdating;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogCreateFormData>({
    resolver: yupResolver(blogCreateSchema),
  });

  useEffect(() => {
    if (blogData?.data) {
      reset({
        title: blogData.data.title,
        content: blogData.data.content,
      });
    }
  }, [blogData, reset]);

  const submitFormHandler = (data: BlogCreateFormData) => {
    if (isEditMode && blogId) {
      updateBlog(
        { blogId, blogData: data },
        {
          onSuccess: (response) => {
            toast.success(response.message || "Blog updated successfully!");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      createBlog(data, {
        onSuccess: (response) => {
          toast.success(response.message || "Blog created successfully!");
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <div>
      <CreateBlogHeader isEditMode={isEditMode} />

      {fetchingBlog ? (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Title</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content</Label>
                <TextEditor
                  key={blogId || "new"}
                  content={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="self-start mt-4 w-30 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : isEditMode ? (
                "Update Blog"
              ) : (
                "Create Blog"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
