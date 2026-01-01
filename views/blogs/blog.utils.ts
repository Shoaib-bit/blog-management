import { APIError } from "@/http/api.error";
import { http } from "@/http/http";
import { Blog, User } from "@/types/types";
import axios from "axios";

export interface BlogRequest {
  query?: string;
  page?: number;
  limit?: number;
}
export interface BlogResponse {
  data: {
    posts: Blog[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
}

export interface CreateBlogResponse {
  data: Blog;
  message: string;
}

export interface DeleteBlogResponse {
  message: string;
}

export interface GetBlogByIdResponse {
  data: Blog;
  message: string;
}

export interface UpdateBlogRequest {
  title: string;
  content: string;
}

export interface UpdateBlogResponse {
  data: Blog;
  message: string;
}

export const getBlogsApi = async (
  params: BlogRequest
): Promise<BlogResponse> => {
  try {
    const response = await http.get<BlogResponse>("/posts", {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, "Failed to fetch blogs");
    }
    throw new APIError("An unexpected error occurred while fetching blogs");
  }
};

export const createBlogApi = async (
  blogData: CreateBlogRequest
): Promise<CreateBlogResponse> => {
  try {
    if (!blogData.title || !blogData.content) {
      throw new APIError("Title and content are required to create a blog");
    }
    const response = await http.post<CreateBlogResponse>("/posts", blogData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, "Failed to create blog");
    }
    throw new APIError("An unexpected error occurred while creating blog");
  }
};

export const deleteBlogApi = async (
  blogId: string
): Promise<DeleteBlogResponse> => {
  try {
    const response = await http.delete<DeleteBlogResponse>(`/posts/${blogId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, "Failed to delete blog");
    }
    throw new APIError("An unexpected error occurred while deleting blog");
  }
};

export const getBlogByIdApi = async (
  blogId: string
): Promise<GetBlogByIdResponse> => {
  try {
    const response = await http.get<GetBlogByIdResponse>(`/posts/${blogId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, "Failed to fetch blog");
    }
    throw new APIError("An unexpected error occurred while fetching blog");
  }
};

export const updateBlogApi = async (
  blogId: string,
  blogData: UpdateBlogRequest
): Promise<UpdateBlogResponse> => {
  try {
    if (!blogData.title || !blogData.content) {
      throw new APIError("Title and content are required to update a blog");
    }
    const response = await http.put<UpdateBlogResponse>(
      `/posts/${blogId}`,
      blogData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, "Failed to update blog");
    }
    throw new APIError("An unexpected error occurred while updating blog");
  }
};
