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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative font-sans">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
              <img 
                src="/logo_its.png" 
                alt="Investo Tax Solutions" 
                className="h-12 w-12 md:h-20 md:w-20"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Simplify Your Tax &
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Business Solutions
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Professional tax services, GST compliance, and financial solutions designed to help your business grow with confidence and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/appointment')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border border-white/20 backdrop-blur-sm"
            >
              Book an Appointment
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToServices}
              className="border-2 border-white/20 hover:bg-white/10 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-light">Comprehensive solutions for your business needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Direct Taxation')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit">
                  <Calculator className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  Direct Taxation
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Income tax return, End-to-end income tax compliance and advisory
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Indirect Taxation (GST)')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-fit">
                  <FileText className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-semibold">
                  Indirect Taxation (GST)
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Comprehensive GST services including registration, returns, and audits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('TDS & TCS Compliance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-fit">
                  <CreditCard className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                  TDS & TCS Compliance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Accurate deduction, return filing, and compliance with TDS/TCS provisions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Accounting & Bookkeeping')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full w-fit">
                  <Banknote className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-semibold">
                  Accounting & Bookkeeping
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Reliable day-to-day bookkeeping and financial statement preparation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Audits & Assurance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit">
                  <Shield className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  Audits & Assurance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Statutory, tax, and GST audits with full regulatory compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Internal & Management Audits')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-fit">
                  <TrendingUp className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
                  Internal & Management Audits
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Independent audit services to improve internal controls and efficiency
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Business & Financial Consultancy')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-fit">
                  <Users className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                  Business & Financial Consultancy
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Strategic support in structuring, funding, projections, and planning
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('ROC & Corporate Compliance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full w-fit">
                  <FileText className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent font-semibold">
                  ROC & Corporate Compliance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  End-to-end MCA filings, company law compliance, and regulatory support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Litigation & Representation')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full w-fit">
                  <Shield className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  Litigation & Representation
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Expert handling of notices, assessments, and appeals before authorities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Trust Formation & Compliance')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full w-fit">
                  <Users className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  Trust Formation & Compliance
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Trust registration, 12A/80G approvals, and ongoing advisory for NGOs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('Trust Audits & Reporting')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-fit">
                  <FileText className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-semibold">
                  Trust Audits & Reporting
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Dedicated audit and compliance services for public trusts and societies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-900/80 to-slate-800/80 border-0 backdrop-blur-sm border border-white/10"
              onClick={() => handleServiceClick('On-Site & Remote Accounting')}
            >
              <CardHeader className="text-center p-3 md:p-6">
                <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-full w-fit">
                  <Clock className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-sm md:text-xl bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent font-semibold">
                  On-Site & Remote Accounting
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-400 hidden md:block font-light">
                  Providing skilled human resources for maintaining accounts and bookkeeping
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">Why Choose Investo Tax Solutions</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <Shield className="h-8 w-8 md:h-16 md:w-16 text-blue-400 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 text-white">Trusted Expertise</h3>
              <p className="text-xs md:text-base text-gray-300 font-light">Years of experience in tax and financial services</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-8 w-8 md:h-16 md:w-16 text-blue-400 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 text-white">Quick Turnaround</h3>
              <p className="text-xs md:text-base text-gray-300 font-light">Fast and efficient service delivery</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 md:h-16 md:w-16 text-blue-400 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 text-white">Quality Assurance</h3>
              <p className="text-xs md:text-base text-gray-300 font-light">Comprehensive quality checks and reviews</p>
            </div>
            
            <div className="text-center">
              <Users className="h-8 w-8 md:h-16 md:w-16 text-blue-400 mx-auto mb-2 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 text-white">Client Focused</h3>
              <p className="text-xs md:text-base text-gray-300 font-light">Personalized solutions for your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 tracking-tight">About Investo Tax Solutions</h2>
            <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 font-light leading-relaxed">
              We are a leading provider of comprehensive tax and financial services, dedicated to helping businesses 
              navigate the complex world of taxation and compliance. Our team of experienced professionals is committed 
              to delivering exceptional service and ensuring your business stays compliant while maximizing growth opportunities.
            </p>
            <p className="text-sm md:text-lg text-gray-300 font-light leading-relaxed">
              From GST compliance to invoice discounting, we offer end-to-end solutions that simplify your business operations 
              and help you focus on what matters most - growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-12 md:py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">Our Clients</h2>
            <p className="text-sm md:text-lg text-gray-300 font-light mb-6">Trusted by leading companies</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="flex flex-col items-center">
              <img src="/walmart.png" alt="Walmart" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Walmart</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/zomato.png" alt="Zomato" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Zomato</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/infosys.png" alt="Infosys" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Infosys</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/ey.png" alt="EY" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">EY</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/google.png" alt="Google" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Google</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/wipro.png" alt="Wipro" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Wipro</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/amazon.png" alt="Amazon" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Amazon</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/salesforce.png" alt="Salesforce" className="object-contain h-20 w-40 sm:h-24 sm:w-48 mb-2 rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-gray-300 font-light">Salesforce</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-r from-gray-900 to-black text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo_its.png" 
                  alt="Investo Tax Solutions" 
                  className="h-8 w-8 md:h-10 md:w-10"
                />
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Investo Tax Solutions</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base font-light">
                Your trusted partner for tax and business solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base font-light">
                <li>GST Services</li>
                <li>E-Invoicing</li>
                <li>E-Way Bill</li>
                <li>TDS & TCS Compliance</li>
                <li>Financing</li>
                <li>Invoice Discounting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm md:text-base font-light">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@investotax.in
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 8788986439
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm font-light">
              © 2024 Investo Tax Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
