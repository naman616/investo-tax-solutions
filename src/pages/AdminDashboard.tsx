import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fetchAdminData = async (endpoint: string) => {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized or failed to fetch");
  return res.json();
};

function downloadCSV(data: any[], filename: string) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const csv = [keys.join(",")].concat(
    data.map(row => keys.map(k => JSON.stringify(row[k] ?? "")).join(","))
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [blogForm, setBlogForm] = useState({ id: null, title: "", content: "", author: "" });
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const blogFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin-login");
    }
    fetchAdminData("/api/admin/appointments").then(data => setAppointments(data.appointments)).catch(() => setError("Failed to load appointments"));
    fetchAdminData("/api/admin/documents").then(data => setDocuments(data.documents)).catch(() => setError("Failed to load documents"));
    fetchAdminData("/api/admin/reviews").then(data => setReviews(data.reviews)).catch(() => setError("Failed to load reviews"));
    fetchAdminData("/api/admin/blogs").then(data => setBlogs(data.blogs)).catch(() => setError("Failed to load blogs"));
  }, [navigate]);

  const refreshBlogs = () => {
    fetchAdminData("/api/admin/blogs").then(data => setBlogs(data.blogs)).catch(() => setError("Failed to load blogs"));
  };

  const handleBlogFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogLoading(true);
    const method = editingBlogId ? "PUT" : "POST";
    const body = editingBlogId ? { ...blogForm, id: editingBlogId } : blogForm;
    const token = localStorage.getItem("admin_token");
    await fetch("/api/admin/blogs", {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    setBlogLoading(false);
    setBlogForm({ id: null, title: "", content: "", author: "" });
    setEditingBlogId(null);
    refreshBlogs();
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setBlogForm({ id: blog.id, title: blog.title, content: blog.content, author: blog.author });
    blogFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteBlog = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    const token = localStorage.getItem("admin_token");
    await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    refreshBlogs();
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="flex justify-center mb-6">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <div className="mb-2 flex justify-end">
            <Button size="sm" onClick={() => downloadCSV(appointments, "appointments.csv")}>Export CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Email</th>
                  <th className="px-2 py-1">Service</th>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td className="px-2 py-1">{a.name}</td>
                    <td className="px-2 py-1">{a.email}</td>
                    <td className="px-2 py-1">{a.service}</td>
                    <td className="px-2 py-1">{a.date}</td>
                    <td className="px-2 py-1">{a.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="documents">
          <div className="mb-2 flex justify-end">
            <Button size="sm" onClick={() => downloadCSV(documents, "documents.csv")}>Export CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Email</th>
                  <th className="px-2 py-1">Files</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d.id}>
                    <td className="px-2 py-1">{d.name}</td>
                    <td className="px-2 py-1">{d.email}</td>
                    <td className="px-2 py-1">
                      {d.files && d.files.map((f: any, i: number) => (
                        <div key={i}>
                          <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{f.field}</a>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard; 