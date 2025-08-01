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
  Users,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          
        })
      });
  
      if (response.ok) {
        alert(`Thank you for booking an appointment! Your request has been received and we will reach out to you soon.`);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServiceClick = (service: string) => {
    const urlSlug = service.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[&()]/g, '') // Remove &, (, and )
      .replace(/--+/g, '-') // Remove multiple consecutive hyphens
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      .replace(/on-site/g, 'onsite') // Special case for On-Site
      .replace(/remote-accounting/g, 'remote-accounting'); // Keep this as is
    navigate(`/services/${urlSlug}`);
  };

  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your tax and business services. Can you help me?");
  const whatsappUrl = `https://wa.me/918788986439?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
              <img 
                src="/logo_its.png" 
                alt="Investo Tax Solutions" 
                className="h-12 w-12 md:h-20 md:w-20"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Simplify Your Tax &
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Business Solutions
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional tax services, GST compliance, and financial solutions designed to help your business grow with confidence and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/appointment')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              Book an Appointment
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToServices}
              className="border-2 border-blue-200 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">Comprehensive solutions for your business needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 border-0"
              onClick={() => handleServiceClick('Direct Taxation')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit">
                  <Calculator className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Direct Taxation
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Income tax return, End-to-end income tax compliance and advisory
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-red-50 border-0"
              onClick={() => handleServiceClick('File ITR')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-fit">
                  <FileText className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  File ITR
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Professional Income Tax Return filing services for individuals and businesses
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 border-0"
              onClick={() => handleServiceClick('Indirect Taxation (GST)')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-fit">
                  <FileText className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Indirect Taxation (GST)
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Comprehensive GST services including registration, returns, and audits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50 border-0"
              onClick={() => handleServiceClick('TDS & TCS Compliance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-fit">
                  <CreditCard className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  TDS & TCS Compliance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Accurate deduction, return filing, and compliance with TDS/TCS provisions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-emerald-50 border-0"
              onClick={() => handleServiceClick('Accounting & Bookkeeping')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full w-fit">
                  <Banknote className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Accounting & Bookkeeping
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Reliable day-to-day bookkeeping and financial statement preparation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 border-0"
              onClick={() => handleServiceClick('Audits & Assurance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit">
                  <Shield className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Audits & Assurance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Statutory, tax, and GST audits with full regulatory compliance
                </CardDescription>
              </CardHeader>
            </Card>



            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50 border-0"
              onClick={() => handleServiceClick('ROC & Corporate Compliance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full w-fit">
                  <FileText className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                  ROC & Corporate Compliance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  End-to-end MCA filings, company law compliance, and regulatory support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-rose-50 border-0"
              onClick={() => handleServiceClick('Litigation & Representation')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full w-fit">
                  <Shield className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Litigation & Representation
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Expert handling of notices, assessments, and appeals before authorities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-violet-50 border-0"
              onClick={() => handleServiceClick('Trust Formation & Compliance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full w-fit">
                  <Users className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Trust Formation & Compliance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600 hidden md:block">
                  Trust registration, 12A/80G approvals, and ongoing advisory for NGOs
                </CardDescription>
              </CardHeader>
            </Card>




          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Investo Tax Solutions</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <Shield className="h-8 w-8 md:h-16 md:w-16 text-blue-600 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">Trusted Expertise</h3>
              <p className="text-xs md:text-base text-gray-600">Years of experience in tax and financial services</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-8 w-8 md:h-16 md:w-16 text-blue-600 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">Quick Turnaround</h3>
              <p className="text-xs md:text-base text-gray-600">Fast and efficient service delivery</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 md:h-16 md:w-16 text-blue-600 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">Quality Assurance</h3>
              <p className="text-xs md:text-base text-gray-600">Comprehensive quality checks and reviews</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 md:h-16 md:w-16 text-blue-600 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">Client Focused</h3>
              <p className="text-xs md:text-base text-gray-600">Personalized solutions for your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">About Investo Tax Solutions</h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8">
              We are a leading provider of comprehensive tax and financial services, dedicated to helping businesses 
              navigate the complex world of taxation and compliance. Our team of experienced professionals is committed 
              to delivering exceptional service and ensuring your business stays compliant while maximizing growth opportunities.
            </p>
            <p className="text-sm md:text-lg text-gray-600">
              From GST compliance to invoice discounting, we offer end-to-end solutions that simplify your business operations 
              and help you focus on what matters most - growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-12 md:py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Our Clients</h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6">Trusted by leading companies</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="flex flex-col items-center">
              <img src="/walmart.png" alt="Walmart" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Walmart</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/zomato.png" alt="Zomato" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Zomato</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/infosys.png" alt="Infosys" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Infosys</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/ey.png" alt="EY" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">EY</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/google.png" alt="Google" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Google</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/wipro.png" alt="Wipro" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Wipro</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/amazon.png" alt="Amazon" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Amazon</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/salesforce.png" alt="Salesforce" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-md grayscale" />
              <span className="text-xs text-gray-700">Salesforce</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo_its.png" 
                  alt="Investo Tax Solutions" 
                  className="h-8 w-8 md:h-10 md:w-10"
                />
                <span className="text-lg md:text-xl font-bold">Investo Tax Solutions</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                Your trusted partner for tax and business solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li>GST Services</li>
                <li>E-Invoicing</li>
                <li>E-Way Bill</li>
                <li>TDS & TCS Compliance</li>
                <li>Financing</li>
                <li>Invoice Discounting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@investotax.in
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 8788986439
                </p>
                <button
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Investo Tax Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
