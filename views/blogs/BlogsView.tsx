"use client";
import { BlogListHeader, BlogCard } from "./components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Blog } from "@/types/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useGetBlogs } from "@/hooks/useGetBlog";

export const BlogsView = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [limit] = useState(10);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

  const { data, isLoading, isError, error } = useGetBlogs({
    page,
    limit,
    query: search,
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== searchInput) {
        setSearch(searchInput);
        setPage(1);
        setAllBlogs([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.posts) {
      if (page === 1 && search === searchInput) {
        setAllBlogs(data.data.posts);
      } else if (page > 1) {
        setAllBlogs((prev) => {
          const newPosts = data.data.posts.filter(
            (post) => !prev.some((p) => p.id === post.id)
          );
          return [...prev, ...newPosts];
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = data?.data?.pagination
    ? page < data.data.pagination.totalPages
    : false;

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
        {isLoading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : allBlogs.length > 0 ? (
          <>
            {allBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}

            {hasMore && (
              <div className="flex justify-center mt-6 mb-8">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="min-w-37.5"
                >
                  {isLoading && page > 1 ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
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
