import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data.blogs || []))
      .catch(() => setError("Failed to load blogs"));
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Blog
      </h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>
                <Link to={`/blogs/${blog.id}`} className="text-blue-700 hover:underline">
                  {blog.title}
                </Link>
              </CardTitle>
              <div className="text-xs text-gray-500">By {blog.author} on {blog.created_at?.slice(0, 10)}</div>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700 line-clamp-3">{blog.content}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blogs; 