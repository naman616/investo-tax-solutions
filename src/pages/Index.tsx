
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calculator, 
  FileText, 
  Receipt, 
  TrendingUp, 
  CreditCard, 
  Banknote,
  Mail,
  Phone,
  User,
  CheckCircle,
  Shield,
  Clock,
  Users
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/86e297e2-14be-4917-a44d-353fcc64bc9a.png" 
              alt="Investo Tax Solutions" 
              className="h-12 w-12"
            />
            <span className="text-2xl font-bold text-blue-900">Investo Tax Solutions</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            <Button className="bg-blue-600 hover:bg-blue-700">Book an Appointment</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/86e297e2-14be-4917-a44d-353fcc64bc9a.png" 
              alt="Investo Tax Solutions" 
              className="h-32 w-32"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simplify Your Tax & Business Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional tax services, GST compliance, and financial solutions designed to help your business grow with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book an Appointment
            </Button>
            <Button size="lg" variant="outline">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for your business needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>GST Services</CardTitle>
                <CardDescription>Complete GST registration, filing, and compliance management</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>E-Invoicing</CardTitle>
                <CardDescription>Seamless electronic invoicing solutions for B2B transactions</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Receipt className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>E-Way Bill</CardTitle>
                <CardDescription>Automated e-way bill generation and management system</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>MaxITC</CardTitle>
                <CardDescription>Maximize your Input Tax Credit with our expert guidance</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>TDS Services</CardTitle>
                <CardDescription>Tax Deducted at Source compliance and filing services</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Banknote className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Financing</CardTitle>
                <CardDescription>Business financing solutions to fuel your growth</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Invoice Discounting</CardTitle>
                <CardDescription>Convert your invoices to immediate cash flow</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Investo Tax Solutions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Expertise</h3>
              <p className="text-gray-600">Years of experience in tax and financial services</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">Fast and efficient service delivery</p>
            </div>
            
            <div className="text-center">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Personalized customer service and support</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Compliance</h3>
              <p className="text-gray-600">Ensuring full regulatory compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About Investo Tax Solutions</h2>
            <p className="text-lg text-gray-600 mb-8">
              We are a leading provider of comprehensive tax and financial services, dedicated to helping businesses 
              navigate the complex world of taxation and compliance. Our team of experienced professionals is committed 
              to delivering exceptional service and ensuring your business stays compliant while maximizing growth opportunities.
            </p>
            <p className="text-lg text-gray-600">
              From GST compliance to invoice discounting, we offer end-to-end solutions that simplify your business operations 
              and help you focus on what matters most - growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
              <p className="text-xl text-gray-600">Get in touch and we'll reach out to you soon</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
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
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Book an Appointment
                  </Button>
                </form>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800 font-medium">We'll reach out to you soon!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/lovable-uploads/86e297e2-14be-4917-a44d-353fcc64bc9a.png" 
                  alt="Investo Tax Solutions" 
                  className="h-10 w-10"
                />
                <span className="text-xl font-bold">Investo Tax Solutions</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for tax and business solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>GST Services</li>
                <li>E-Invoicing</li>
                <li>E-Way Bill</li>
                <li>TDS Services</li>
                <li>Financing</li>
                <li>Invoice Discounting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@investotaxsolutions.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91-XXXXXXXXXX
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Investo Tax Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
