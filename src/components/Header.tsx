import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", href: "#services", isAnchor: true },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Submit Documents", href: "/documents" },
  { label: "Clients", href: "#clients", isAnchor: true },
  { label: "About", href: "#about", isAnchor: true },
  { label: "Contact", href: "#contact", isAnchor: true },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const handleNavClick = (e: React.MouseEvent, link: any) => {
    if (link.isAnchor) {
      e.preventDefault();
      if (location.pathname === "/") {
        scrollTo(link.href.replace('#', ''));
      } else {
        navigate(`/?scroll=${link.href.replace('#', '')}`);
      }
      setMobileMenuOpen(false);
    }
  };
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("scroll")) {
      setTimeout(() => scrollTo(params.get("scroll")!), 100);
    }
  }, [location]);
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-3">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/">
            <img 
              src="/logo_its.png" 
              alt="Investo Tax Solutions Logo" 
              style={{ height: 36, width: 'auto', objectFit: 'contain', background: 'white', borderRadius: 8, padding: 2, marginLeft: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            />
          </Link>
          <span className="font-bold text-lg md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none">
            Investo Tax Solutions
          </span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" onClick={e => handleNavClick(e, navLinks[0])} className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
          <Link to="/documents" className="text-gray-700 hover:text-blue-600 font-medium">Submit Documents</Link>
          <a href="#clients" onClick={e => handleNavClick(e, navLinks[3])} className="text-gray-700 hover:text-blue-600 font-medium">Clients</a>
          <a href="#about" onClick={e => handleNavClick(e, navLinks[4])} className="text-gray-700 hover:text-blue-600 font-medium">About</a>
          <button onClick={() => scrollTo('contact')} className="text-gray-700 hover:text-blue-600 font-medium bg-none border-none cursor-pointer">Contact</button>
          <Button onClick={() => scrollTo('contact')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">Book an Appointment</Button>
        </nav>
        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <a href="#services" onClick={e => handleNavClick(e, navLinks[0])} className="text-gray-700 font-medium">Services</a>
          <Link to="/documents" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Submit Documents</Link>
          <a href="#clients" onClick={e => handleNavClick(e, navLinks[3])} className="text-gray-700 font-medium">Clients</a>
          <a href="#about" onClick={e => handleNavClick(e, navLinks[4])} className="text-gray-700 font-medium">About</a>
          <button onClick={() => { scrollTo('contact'); setMobileMenuOpen(false); }} className="text-gray-700 font-medium bg-none border-none cursor-pointer">Contact</button>
          <Button onClick={() => { scrollTo('contact'); setMobileMenuOpen(false); }} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">Book an Appointment</Button>
        </div>
      )}
    </header>
  );
};

export default Header; 