import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const documentFields = [
  "Previous Year ITR File",
  "Total Sales During the Year",
  "Total Purchases During the Year",
  "Debtors as on 31st March",
  "Creditors as on 31st March",
  "All Bank Statement/Accounts",
  "Loan Statement (if any)",
  "GSTR-1 of Last Year",
  "GSTR-3B of Last Year",
  "Others",
];

/**
 * Documents page component.
 * Allows users to upload various financial documents and submit their contact info.
 * On submit, sends data to the internal API for admin review.
 */
const Documents = () => {
  // State for form fields and file uploads
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input changes for each document field
  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      Object.entries(files).forEach(([field, file]) => {
        if (file) {
          formData.append(field, file);
        }
      });
      // Send form data to internal API endpoint
      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '' });
        setFiles({});
      } else {
        setSuccess(false);
        alert('Failed to submit documents.');
      }
    } catch (err) {
      setSuccess(false);
      alert('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Submit Your Documents
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required className="border border-gray-300 rounded-md focus:border-blue-500" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="border border-gray-300 rounded-md focus:border-blue-500" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required className="border border-gray-300 rounded-md focus:border-blue-500" />
          </div>
          {documentFields.map((field) => (
            <div key={field}>
              <Label>{field}</Label>
              <input
                type="file"
                className="block w-full text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-blue-200 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500"
                onChange={e => handleFileChange(field, e.target.files?.[0] || null)}
              />
            </div>
          ))}
          <Button type="submit" disabled={loading} className="w-full border border-blue-400 rounded-md shadow-sm">
            {loading ? "Submitting..." : "Submit Documents"}
          </Button>
          {success && <div className="text-green-600 text-center mt-2">Documents submitted successfully!</div>}
        </form>
        <div className="mt-8 text-xs text-gray-500 text-center border-t pt-4">
          <strong>How to check if your file was uploaded:</strong><br />
          Log in to the <span className="text-blue-700 font-semibold">Admin Dashboard</span> and view the Documents tab. You will see all submitted files and can download them directly from there.
        </div>
      </div>
    </div>
  );
};

export default Documents; 