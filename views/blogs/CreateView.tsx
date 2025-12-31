"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateBlogHeader } from "./components";
import { TextEditor } from "@/components/TextEditor";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogApi } from "./blog.utils";
import { toast } from "sonner";

const blogCreateSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup
    .string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
});

type BlogCreateFormData = yup.InferType<typeof blogCreateSchema>;

export const CreateView = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogCreateFormData>({
    resolver: yupResolver(blogCreateSchema),
  });

  const submitFormHandler = async (data: BlogCreateFormData) => {
    try {
      setLoading(true);
      const response = await createBlogApi({
        title: data.title,
        content: data.content,
      });
      toast.success(response.message || "Blog created successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CreateBlogHeader />

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
              <TextEditor content={field.value} onChange={field.onChange} />
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
            ) : (
              "Create Blog"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
