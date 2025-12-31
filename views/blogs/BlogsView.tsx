"use client";
import { BlogListHeader, BlogCard } from "./components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { Blog } from "@/types/types";
import { toast } from "sonner";
import { getBlogsApi } from "./blog.utils";
import { Loader2 } from "lucide-react";

export const BlogsView = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [limit] = useState(10);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const fetchBlogs = async (currentPage: number, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const params = {
        page: currentPage,
        limit,
        query: search,
      };

      const res = await getBlogsApi(params);

      if (isLoadMore) {
        setBlogs((prev) => [...prev, ...res.data.posts]);
      } else {
        setBlogs(res.data.posts);
      }

      setHasMore(currentPage < res.data.pagination.totalPages);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchBlogs(page, false);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage, true);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
  };

  return (
    <div>
      <BlogListHeader />
      <div>
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : blogs.length > 0 ? (
          <>
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onDelete={handleDeleteBlog} />
            ))}

            {hasMore && (
              <div className="flex justify-center mt-6 mb-8">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  variant="outline"
                  className="min-w-37.5"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-lg font-medium">No blogs found</p>
            <p className="text-sm mt-2">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};
