import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "File ITR",
    description: "Income Tax Return filing for individuals and businesses.",
  },
  {
    name: "GST Services",
    description: "GST registration, filing, and compliance management.",
  },
  {
    name: "Investment and Finance",
    description: "Investment planning, financial advisory, and portfolio management.",
  },
  {
    name: "TDS Services",
    description: "TDS return filing, compliance, and advisory.",
  },
  {
    name: "Accounts and Book Keeping",
    description: "Professional bookkeeping and accounting services.",
  },
  {
    name: "Business Advisory",
    description: "Business setup, strategy, and compliance advisory.",
  },
  {
    name: "Incorporation Services",
    description: "Company, LLP, and partnership incorporation services.",
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