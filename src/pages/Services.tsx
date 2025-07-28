import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Receipt, TrendingUp, CreditCard, Banknote, Users, Shield, Briefcase, Book, Gavel, Building2, UserCheck, ClipboardList, Globe, Layers, UserPlus, Home, CheckCircle, BarChart3 } from "lucide-react";

const services = [
  {
    name: "Direct Taxation",
    description: "Income tax return, End-to-end income tax compliance and advisory for individuals and businesses.",
    icon: <FileText className="h-4 w-4 md:h-8 md:w-8 text-blue-600" />,
  },
  {
    name: "Indirect Taxation (GST)",
    description: "Comprehensive GST services including registration, returns, reconciliation, and audits.",
    icon: <Receipt className="h-4 w-4 md:h-8 md:w-8 text-purple-600" />,
  },
  {
    name: "TDS & TCS Compliance",
    description: "Accurate deduction, return filing, and compliance with TDS/TCS provisions.",
    icon: <TrendingUp className="h-4 w-4 md:h-8 md:w-8 text-indigo-600" />,
  },
  {
    name: "Accounting & Bookkeeping",
    description: "Reliable day-to-day bookkeeping and financial statement preparation.",
    icon: <Book className="h-4 w-4 md:h-8 md:w-8 text-green-600" />,
  },
  {
    name: "Audits & Assurance",
    description: "Statutory, tax, and GST audits with full regulatory compliance and transparency.",
    icon: <Shield className="h-4 w-4 md:h-8 md:w-8 text-blue-400" />,
  },
  {
    name: "Internal & Management Audits",
    description: "Independent audit services to improve internal controls and business efficiency.",
    icon: <ClipboardList className="h-4 w-4 md:h-8 md:w-8 text-pink-600" />,
  },
  {
    name: "Business & Financial Consultancy",
    description: "Strategic support in structuring, funding, projections, and financial planning.",
    icon: <BarChart3 className="h-4 w-4 md:h-8 md:w-8 text-yellow-600" />,
  },
  {
    name: "ROC & Corporate Compliance",
    description: "End-to-end MCA filings, company law compliance, and regulatory support.",
    icon: <Building2 className="h-4 w-4 md:h-8 md:w-8 text-cyan-600" />,
  },
  {
    name: "Litigation & Representation Services",
    description: "Expert handling of notices, assessments, and appeals before tax authorities.",
    icon: <Gavel className="h-4 w-4 md:h-8 md:w-8 text-red-600" />,
  },
  {
    name: "Trust Formation & Compliance",
    description: "Trust registration, 12A/80G approvals, and ongoing advisory for NGOs and charitable trusts.",
    icon: <UserPlus className="h-4 w-4 md:h-8 md:w-8 text-teal-600" />,
  },
  {
    name: "Trust Audits & Reporting",
    description: "Dedicated audit and compliance services for public trusts, societies, and Section 8 companies.",
    icon: <Layers className="h-4 w-4 md:h-8 md:w-8 text-violet-600" />,
  },
  {
    name: "On-Site & Remote Accounting Support",
    description: "Providing skilled human resources for maintaining accounts and bookkeeping at your premises or remotely.",
    icon: <Home className="h-4 w-4 md:h-8 md:w-8 text-orange-600" />,
  },
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.name} className="hover:shadow-xl transition-all">
            <CardHeader>
              <div className="mx-auto mb-2 md:mb-4 p-2 md:p-3 rounded-full w-fit bg-gradient-to-r from-blue-100 to-purple-100">
                {service.icon}
              </div>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate(`/appointment?service=${encodeURIComponent(service.name)}`)}>
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services; 