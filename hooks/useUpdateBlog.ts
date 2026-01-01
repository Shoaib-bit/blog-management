import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateBlogApi,
  type UpdateBlogRequest,
  type UpdateBlogResponse,
} from "@/views/blogs/blog.utils";

interface UpdateBlogParams {
  blogId: string;
  blogData: UpdateBlogRequest;
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation<UpdateBlogResponse, Error, UpdateBlogParams>({
    mutationFn: async ({ blogId, blogData }: UpdateBlogParams) => {
      return await updateBlogApi(blogId, blogData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.blogId] });
    },
  });
}
