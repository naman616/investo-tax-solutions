import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Phone, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const serviceDetails = {
  'direct-taxation': {
    title: 'Direct Taxation',
    description: 'Income tax return, End-to-end income tax compliance and advisory for individuals and businesses.',
    details: [
      'Income Tax Return Filing (ITR) for Individuals & Businesses',
      'Tax Planning & Optimization Strategies',
      'Advance Tax Calculation & Payment',
      'Capital Gains Tax Planning & Compliance',
      'Tax Audit Support & Representation',
      'Tax Notice Handling & Assessment Support',
      'International Taxation & DTAA Compliance',
      'Tax Litigation & Appeal Representation',
    ],
    benefits: [
      'Accurate and timely tax filing with zero penalties',
      'Personalized tax planning to minimize tax liability',
      'Expert guidance on complex tax matters',
      'Comprehensive support for notices and scrutiny',
      'Strategic tax optimization for maximum savings',
      'Professional representation before tax authorities',
    ]
  },
  'file-itr': {
    title: 'File ITR',
    description: 'Professional Income Tax Return filing services for individuals and businesses.',
    details: [
      'Individual Income Tax Return Filing (ITR-1, ITR-2, ITR-3, ITR-4)',
      'Business Income Tax Return Filing (ITR-3, ITR-5, ITR-6)',
      'Tax Planning & Optimization for ITR Filing',
      'Document Collection & Verification',
      'Income Computation & Tax Calculation',
      'E-filing & Acknowledgment Generation',
      'ITR Correction & Revision Services',
      'Post-filing Support & Query Resolution',
    ],
    benefits: [
      'Accurate and timely ITR filing with zero errors',
      'Maximum tax savings through proper planning',
      'Complete document management and verification',
      'Professional e-filing with instant acknowledgment',
      'Post-filing support and query resolution',
      'Compliance with all ITR filing requirements',
    ]
  },
  'indirect-taxation-gst': {
    title: 'Indirect Taxation (GST)',
    description: 'Comprehensive GST services including registration, returns, reconciliation, and audits.',
    details: [
      'GST Registration & Amendment Services',
      'Monthly/Quarterly GST Return Filing (GSTR-1, GSTR-3B)',
      'GST Reconciliation & Matching',
      'Input Tax Credit Optimization & Management',
      'GST Audit & Assessment Support',
      'GST Refund Processing & Follow-up',
      'E-invoicing Implementation & Support',
      'GST Advisory & Compliance Review',
    ],
    benefits: [
      'End-to-end GST compliance with zero penalties',
      'Maximum input tax credit utilization',
      'Expert handling of GST audits and assessments',
      'Seamless e-invoicing implementation',
      'Timely refund processing',
      'Comprehensive GST advisory support',
    ]
  },
  'tds-tcs-compliance': {
    title: 'TDS & TCS Compliance',
    description: 'Accurate deduction, return filing, and compliance with TDS/TCS provisions.',
    details: [
      'TDS/TCS Return Filing (Form 24Q, 26Q, 27Q, 27EQ)',
      'TDS/TCS Deduction Calculation & Compliance',
      'TDS Certificate Generation (Form 16, 16A)',
      'Lower/Nil Deduction Certificate Assistance',
      'TDS/TCS Correction & Revision of Returns',
      'TDS/TCS Reconciliation & Matching',
      'TDS/TCS Audit Support',
      'TDS/TCS Notice Handling & Representation',
    ],
    benefits: [
      'Accurate deduction and timely filing',
      'Avoidance of interest and penalties',
      'Expert support for TDS/TCS queries',
      'End-to-end compliance management',
      'Professional certificate management',
      'Comprehensive audit support',
    ]
  },
  'accounting-bookkeeping': {
    title: 'Accounting & Bookkeeping',
    description: 'Reliable day-to-day bookkeeping and financial statement preparation.',
    details: [
      'Day-to-day Bookkeeping & Ledger Maintenance',
      'Preparation of Financial Statements (P&L, Balance Sheet)',
      'Bank Reconciliation & Cash Flow Management',
      'Accounts Payable & Receivable Management',
      'MIS Reporting & Financial Analysis',
      'Inventory Management & Cost Accounting',
      'Payroll Processing & Compliance',
      'Budget Preparation & Variance Analysis',
    ],
    benefits: [
      'Accurate and up-to-date financial records',
      'Improved financial decision-making',
      'Compliance with statutory requirements',
      'Reduced risk of errors and fraud',
      'Enhanced cash flow management',
      'Professional financial reporting',
    ]
  },
  'audits-assurance': {
    title: 'Audits & Assurance',
    description: 'Statutory, tax, and GST audits with full regulatory compliance and transparency.',
    details: [
      'Statutory Audit under Companies Act, 2013',
      'Tax Audit under Section 44AB of Income Tax Act',
      'GST Audit under Section 35(5) of CGST Act',
      'Special Purpose Audit & Due Diligence',
      'Internal Audit & Control Review',
      'Audit Report Preparation & Certification',
      'Audit Follow-up & Compliance Monitoring',
      'Audit Advisory & Best Practices',
    ],
    benefits: [
      'Regulatory compliance and transparency',
      'Enhanced stakeholder confidence',
      'Early detection of discrepancies',
      'Improved internal controls',
      'Professional audit reporting',
      'Comprehensive audit support',
    ]
  },
  'internal-management-audits': {
    title: 'Internal & Management Audits',
    description: 'Independent audit services to improve internal controls and business efficiency.',
    details: [
      'Internal Control Review & Assessment',
      'Process & Risk Assessment',
      'Management Audit & Performance Review',
      'Operational Audit & Efficiency Analysis',
      'Fraud Detection & Prevention',
      'Compliance Audit & Monitoring',
      'IT Audit & System Review',
      'Management Advisory Services',
    ],
    benefits: [
      'Improved internal controls and efficiency',
      'Enhanced operational performance',
      'Risk mitigation and fraud prevention',
      'Actionable management insights',
      'Cost optimization opportunities',
      'Strategic business improvements',
    ]
  },
  'business-financial-consultancy': {
    title: 'Business & Financial Consultancy',
    description: 'Strategic support in structuring, funding, projections, and financial planning.',
    details: [
      'Business Structuring & Entity Selection',
      'Financial Projections & Business Plans',
      'Funding & Loan Advisory Services',
      'Budgeting & Forecasting',
      'Mergers & Acquisitions Support',
      'Investment Advisory & Portfolio Management',
      'Cost Optimization & Profitability Analysis',
      'Strategic Financial Planning',
    ],
    benefits: [
      'Strategic business growth planning',
      'Optimized financial performance',
      'Access to funding solutions',
      'Expert guidance for complex transactions',
      'Enhanced profitability and efficiency',
      'Comprehensive financial advisory',
    ]
  },
  'roc-corporate-compliance': {
    title: 'ROC & Corporate Compliance',
    description: 'End-to-end MCA filings, company law compliance, and regulatory support.',
    details: [
      'MCA/ROC Filings & Annual Returns',
      'Company Law Compliance & Advisory',
      'Director KYC & Compliance',
      'Board Meeting & AGM Support',
      'Corporate Restructuring & Amalgamation',
      'Foreign Direct Investment (FDI) Compliance',
      'Corporate Governance Advisory',
      'Regulatory Reporting & Monitoring',
    ],
    benefits: [
      'Hassle-free compliance management',
      'Avoidance of penalties and legal issues',
      'Expert legal and regulatory support',
      'Timely statutory filings',
      'Enhanced corporate governance',
      'Comprehensive compliance monitoring',
    ]
  },
  'litigation-representation': {
    title: 'Litigation & Representation',
    description: 'Expert handling of notices, assessments, and appeals before tax authorities.',
    details: [
      'Drafting & Filing of Appeals',
      'Representation before Tax Authorities',
      'Handling Tax Notices & Assessments',
      'Assessment Proceedings Support',
      'Legal Advisory & Opinion',
      'Settlement & Mediation Support',
      'Stay Applications & Recovery Proceedings',
      'Expert Witness Services',
    ],
    benefits: [
      'Effective dispute resolution',
      'Reduced litigation risk and costs',
      'Expert legal representation',
      'Comprehensive legal support',
      'Timely resolution of tax disputes',
      'Professional advocacy services',
    ]
  },
  'trust-formation-compliance': {
    title: 'Trust Formation & Compliance',
    description: 'Trust registration, 12A/80G approvals, and ongoing advisory for NGOs and charitable trusts.',
    details: [
      'Trust Registration & Formation',
      '12A/80G Approval Assistance',
      'NGO Advisory & Compliance',
      'Trust Deed Drafting & Registration',
      'Annual Compliance & Reporting',
      'Tax Exemption Applications',
      'Trust Audit Support',
      'Regulatory Advisory & Monitoring',
    ],
    benefits: [
      'Smooth trust formation process',
      'Regulatory compliance assurance',
      'Expert NGO and trust advisory',
      'End-to-end support services',
      'Tax exemption optimization',
      'Professional compliance management',
    ]
  },
  'trust-audits-reporting': {
    title: 'Trust Audits & Reporting',
    description: 'Dedicated audit and compliance services for public trusts, societies, and Section 8 companies.',
    details: [
      'Trust Audit & Certification',
      'Society Audit & Compliance',
      'Section 8 Company Audit',
      'NGO Compliance Reporting',
      'Regulatory Audit & Advisory',
      'Financial Statement Preparation',
      'Compliance Monitoring & Review',
      'Audit Report Certification',
    ],
    benefits: [
      'Accurate audit and reporting',
      'Regulatory compliance assurance',
      'Specialized NGO and trust expertise',
      'Professional audit support',
      'Enhanced transparency and credibility',
      'Comprehensive compliance monitoring',
    ]
  },
  'onsite-remote-accounting': {
    title: 'On-Site & Remote Accounting Support',
    description: 'Providing skilled human resources for maintaining accounts and bookkeeping at your premises or remotely.',
    details: [
      'On-site Bookkeeping & Accounting',
      'Remote Accounting Support',
      'Staff Placement & Training',
      'Accounts Maintenance & Reconciliation',
      'MIS Reporting & Analysis',
      'Process Documentation & SOPs',
      'Quality Control & Review',
      'Technology Implementation Support',
    ],
    benefits: [
      'Flexible accounting solutions',
      'Access to skilled professionals',
      'Cost-effective support services',
      'Seamless team integration',
      'Enhanced efficiency and accuracy',
      'Scalable accounting support',
    ]
  },
};

/**
 * ServiceDetail page component.
 * Shows details for a specific service and allows users to book an appointment or contact via WhatsApp.
 */
const ServiceDetail = () => {
  // Get serviceId from route params and navigation hook
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  // State for appointment form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Get service details from static object
  const service = serviceId ? serviceDetails[serviceId as keyof typeof serviceDetails] : null;

  // WhatsApp message and URL for direct contact
  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in your ${service?.title} services. Can you help me?`);
  const whatsappUrl = `https://wa.me/918788986439?text=${whatsappMessage}`;

  // Handle input changes for the appointment form
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

  // Handle appointment form submission
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
        {/* REMOVE the local <header>...</header> block here */}

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
                    <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-words">
                      Book an Appointment
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
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-base md:text-lg py-3 break-words" 
                        size="lg"
                      >
                        Book Appointment Now
                      </Button>
                    </form>
                    
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center border border-blue-100">
                        <p className="text-blue-800 font-medium">We'll reach out to you soon!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
