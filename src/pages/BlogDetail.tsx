import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        const found = (data.blogs || []).find((b: any) => String(b.id) === String(blogId));
        setBlog(found);
      })
      .catch(() => setError("Failed to load blog"));
  }, [blogId]);

  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
  if (!blog) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl mb-2">{blog.title}</CardTitle>
          <div className="text-xs text-gray-500 mb-2">By {blog.author} on {blog.created_at?.slice(0, 10)}</div>
        </CardHeader>
        <CardContent>
          <div className="text-gray-800 whitespace-pre-line">{blog.content}</div>
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Link to="/blogs" className="text-blue-600 hover:underline">Back to Blogs</Link>
      </div>
    </div>
  );
};

export default BlogDetail; 