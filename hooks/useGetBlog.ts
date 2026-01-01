import { useQuery } from "@tanstack/react-query";
import {
  getBlogsApi,
  type BlogRequest,
  type BlogResponse,
} from "@/views/blogs/blog.utils";

export const useGetBlogs = (params: BlogRequest = {}) => {
  return useQuery<BlogResponse>({
    queryKey: ["blogs", params],
    queryFn: async (): Promise<BlogResponse> => {
      return await getBlogsApi(params);
    },
    enabled: true,
  });
};

export const useGetBlogById = (blogId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const { getBlogByIdApi } = await import("@/views/blogs/blog.utils");
      return await getBlogByIdApi(blogId);
    },
    enabled: enabled && !!blogId,
  });
};
