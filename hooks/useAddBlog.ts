import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBlogApi,
  type CreateBlogRequest,
  type CreateBlogResponse,
} from "@/views/blogs/blog.utils";

export function useAddBlog() {
  const queryClient = useQueryClient();

  return useMutation<CreateBlogResponse, Error, CreateBlogRequest>({
    mutationFn: async (newBlog: CreateBlogRequest) => {
      return await createBlogApi(newBlog);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
