import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    "Direct Taxation",
    "Indirect Taxation (GST)",
    "TDS & TCS Compliance",
    "Accounting & Bookkeeping",
    "Audits & Assurance",
    "Internal & Management Audits",
    "Business & Financial Consultancy",
    "ROC & Corporate Compliance",
    "Litigation & Representation",
    "Trust Formation & Compliance",
    "Trust Audits & Reporting",
    "On-Site & Remote Accounting",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Phone number validation - only allow numbers
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        })
      });
  
      if (response.ok) {
        alert(`Thank you for booking an appointment! Your request has been received and we will reach out to you soon.`);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative font-sans pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 text-gray-300 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Book an Appointment
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light">
              Get expert assistance with our comprehensive tax and business services
            </p>
          </div>

          {/* Appointment Form */}
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-900/90 to-slate-800/90 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white font-semibold tracking-tight">
                Schedule Your Consultation
              </CardTitle>
              <CardDescription className="text-gray-300 font-light">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-gray-300 font-medium">
                    <User className="h-4 w-4" />
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-gray-300 font-medium">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number (numbers only)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-gray-300 font-medium">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-gray-300 font-medium">
                    Service Required
                  </Label>
                  <Select value={formData.service} onValueChange={handleServiceChange} required>
                    <SelectTrigger className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {services.map((service) => (
                        <SelectItem key={service} value={service} className="text-gray-300 hover:text-white">
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-gray-300 font-medium">
                    <MessageSquare className="h-4 w-4" />
                    Additional Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl text-lg py-3 border border-white/20 backdrop-blur-sm" 
                  size="lg"
                >
                  Book Appointment
                </Button>
              </form>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg text-center border border-blue-500/20 backdrop-blur-sm">
                <p className="text-blue-300 font-medium">We'll reach out to you within 24 hours!</p>
                <p className="text-gray-400 text-sm mt-2 font-light">
                  For urgent inquiries, please call us at +91 8788986439
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Appointment; 