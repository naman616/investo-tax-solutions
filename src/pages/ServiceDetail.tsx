import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Phone, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const serviceDetails = {
  'gst-services': {
    title: 'GST Services',
    description: 'Comprehensive GST solutions for your business',
    details: [
      'GST Registration and Setup',
      'Monthly/Quarterly GST Filing',
      'GST Compliance Management',
      'GST Advisory Services',
      'Input Tax Credit Optimization',
      'GST Audit and Assessment Support'
    ],
    benefits: [
      'Expert guidance on GST compliance',
      'Timely filing to avoid penalties',
      'Maximum tax credit utilization',
      'Professional support throughout'
    ]
  },
  'e-invoicing': {
    title: 'E-Invoicing',
    description: 'Digital invoicing solutions for seamless business operations',
    details: [
      'E-Invoice Registration',
      'Invoice Report Portal (IRP) Setup',
      'Real-time Invoice Generation',
      'API Integration Support',
      'Compliance Monitoring',
      'Error Resolution Services'
    ],
    benefits: [
      'Automated invoice processing',
      'Reduced manual errors',
      'Faster payment cycles',
      'Complete regulatory compliance'
    ]
  },
  'e-way-bill': {
    title: 'E-Way Bill',
    description: 'Streamlined goods movement with digital documentation',
    details: [
      'E-Way Bill Generation',
      'Bulk Upload Facility',
      'Vehicle Assignment',
      'Part-A and Part-B Completion',
      'Cancellation Support',
      'Compliance Tracking'
    ],
    benefits: [
      'Hassle-free goods transportation',
      'Real-time tracking capability',
      'Penalty avoidance',
      'Simplified logistics management'
    ]
  },
  'maxitc': {
    title: 'MaxITC',
    description: 'Maximize your Input Tax Credit benefits',
    details: [
      'ITC Reconciliation',
      'Credit Matching Services',
      'Blocked Credit Analysis',
      'Reversal Management',
      'Advisory on ITC Claims',
      'Optimization Strategies'
    ],
    benefits: [
      'Higher cash flow through ITC',
      'Reduced tax liability',
      'Expert credit management',
      'Compliance assurance'
    ]
  },
  'tds-services': {
    title: 'TDS Services',
    description: 'Complete TDS compliance and management solutions',
    details: [
      'TDS Registration',
      'Monthly TDS Filing',
      'TDS Certificate Issuance',
      'Lower Deduction Certificates',
      'TDS Reconciliation',
      'Penalty Management'
    ],
    benefits: [
      'Accurate TDS calculations',
      'Timely compliance',
      'Professional certificate management',
      'Audit support services'
    ]
  },
  'financing': {
    title: 'Business Financing',
    description: 'Financial solutions to fuel your business growth',
    details: [
      'Working Capital Loans',
      'Term Loans',
      'Equipment Financing',
      'Trade Finance',
      'Credit Line Facilities',
      'Loan Documentation Support'
    ],
    benefits: [
      'Quick approval process',
      'Competitive interest rates',
      'Flexible repayment options',
      'Expert financial guidance'
    ]
  },
  'invoice-discounting': {
    title: 'Invoice Discounting',
    description: 'Convert your invoices into immediate cash flow',
    details: [
      'Invoice Evaluation',
      'Quick Fund Disbursement',
      'Flexible Tenure Options',
      'Digital Processing',
      'Credit Assessment',
      'Collection Support'
    ],
    benefits: [
      'Immediate cash flow',
      'No collateral required',
      'Maintain customer relationships',
      'Improved working capital'
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const service = serviceId ? serviceDetails[serviceId as keyof typeof serviceDetails] : null;

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in your ${service?.title} services. Can you help me?`);
  const whatsappUrl = `https://wa.me/918788986439?text=${whatsappMessage}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
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
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: service?.title
        })
      });
  
      if (response.ok) {
        alert(`Thank you for booking a ${service?.title} appointment! We will reach out to you soon.`);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };
  

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h1>
          <Button onClick={() => navigate('/')}>Go back to home</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
        {/* Header */}
        <header className="border-b border-white/20 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="logo_its.png" 
                alt="Investo Tax Solutions" 
                className="h-12 w-12"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Investo Tax Solutions
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Service Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {service.title}
                </span>
              </h1>
              <p className="text-xl text-gray-600">{service.description}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Service Details */}
              <div className="space-y-8">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">What We Offer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Key Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Appointment Form */}
              <div>
                <Card className="shadow-2xl border-0 bg-white sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Book an Appointment for {service.title}
                    </CardTitle>
                    <CardDescription>
                      Get expert assistance with our {service.title.toLowerCase()} services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 font-medium">
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
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-medium">
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
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
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
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-lg py-3" 
                        size="lg"
                      >
                        Book an Appointment for {service.title}
                      </Button>
                    </form>
                    
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center border border-blue-100">
                        <p className="text-blue-800 font-medium">We'll reach out to you soon!</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">Or reach out to us directly on WhatsApp</p>
                        <Button
                          onClick={() => window.open(whatsappUrl, '_blank')}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 mx-auto"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          Chat on WhatsApp
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
            aria-label="Contact us on WhatsApp"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
