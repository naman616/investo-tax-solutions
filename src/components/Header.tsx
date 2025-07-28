import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home and then scroll to contact
      window.location.href = '/#contact';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <img 
              src="/logo_its.png" 
              alt="Investo Tax Solutions" 
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Investo Tax Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/services" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link 
              to="/documents" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
              onClick={closeMenu}
            >
              Submit Documents
            </Link>
            <Link 
              to="/reviews" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
              onClick={closeMenu}
            >
              Clients
            </Link>
            <Link 
              to="/blogs" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
              onClick={closeMenu}
            >
              About
            </Link>
            <Button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm"
            >
              Contact
            </Button>
            <Link to="/appointment">
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm"
              >
                Book an Appointment
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <nav className="py-4 space-y-4">
              <Link 
                to="/services" 
                className="block px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link 
                to="/documents" 
                className="block px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Submit Documents
              </Link>
              <Link 
                to="/reviews" 
                className="block px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Clients
              </Link>
              <Link 
                to="/blogs" 
                className="block px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                About
              </Link>
              <div className="px-4 space-y-2">
                <Button 
                  onClick={() => {
                    scrollToContact();
                    closeMenu();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm"
                >
                  Contact
                </Button>
                <Link to="/appointment" onClick={closeMenu}>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm"
                  >
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 