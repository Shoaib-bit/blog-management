import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteBlogApi,
  type DeleteBlogResponse,
} from "@/views/blogs/blog.utils";

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation<DeleteBlogResponse, Error, string>({
    mutationFn: async (blogId: string) => {
      return await deleteBlogApi(blogId);
    },
    onSuccess: (_, blogId) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });
}
