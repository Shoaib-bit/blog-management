import { CreateView } from "@/views/blogs/CreateView";
import { getAuthToken } from "@/lib/auth-cookies";
import { redirect } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage = async ({ params }: EditPageProps) => {
  const token = await getAuthToken();

  if (!token) {
    redirect("/login");
  }

  const { id } = await params;

  return <CreateView blogId={id} />;
};

export default EditPage;
