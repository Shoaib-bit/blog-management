import { BlogDetailView } from "@/views/blogs/BlogDetailView";
import { getBlogByIdApi } from "@/views/blogs/blog.utils";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { id } = await params;

  try {
    const response = await getBlogByIdApi(id);
    return <BlogDetailView blog={response.data} />;
  } catch (error) {
    notFound();
  }
};

export default BlogDetailPage;
