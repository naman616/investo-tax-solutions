import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const services = [
  "File ITR",
  "GST Services",
  "Investment and Finance",
  "TDS Services",
  "Accounts and Book Keeping",
  "Business Advisory",
  "Incorporation Services",
];

const Appointment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    date: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', service: services[0], date: '', notes: '' });
      } else {
        setSuccess(false);
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      setSuccess(false);
      alert('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-lg">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Book an Appointment
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required className="shadow-sm bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-gray-700" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="shadow-sm bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-gray-700" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required className="shadow-sm bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-gray-700" />
        </div>
        <div>
          <Label htmlFor="service">Service</Label>
          <select id="service" name="service" value={form.service} onChange={handleChange} className="w-full border rounded px-3 py-2 shadow-sm bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-gray-700">
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="date">Preferred Date</Label>
          <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} required className="shadow-sm bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-gray-700" />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} className="shadow-sm bg-white text-gray-900 border-gray-300 focus:border-gray-700 focus:ring-gray-700" />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-gray-900 text-white hover:bg-gray-700">
          {loading ? "Booking..." : "Book Appointment"}
        </Button>
        {success && <div className="text-green-600 text-center mt-2">Appointment booked! We'll contact you soon.</div>}
      </form>
    </div>
  );
};

export default Appointment; 