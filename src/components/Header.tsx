import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollTo("services");
    } else {
      navigate("/?scroll=services");
    }
  };
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("scroll") === "services") {
      setTimeout(() => scrollTo("services"), 100);
    }
  }, [location]);
  return (
    <header style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      background: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/">
          <img src="/logo_its.png" alt="Investo Tax Solutions Logo" style={{ height: 48 }} />
        </Link>
        <span style={{ fontWeight: 700, fontSize: 20, background: 'linear-gradient(to right, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Investo Tax Solutions
        </span>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#services" onClick={handleServicesClick} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Services</a>
        <Link to="/appointment" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Book Appointment</Link>
        <Link to="/documents" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Submit Documents</Link>
        <a href="#clients" onClick={e => { e.preventDefault(); scrollTo('clients'); }} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Clients</a>
        <a href="#about" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>About</a>
        <button onClick={() => scrollTo('contact')} style={{ color: '#374151', background: 'none', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Contact</button>
        <Button onClick={() => scrollTo('contact')} style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', color: 'white', fontWeight: 600 }}>Book an Appointment</Button>
        <Link to="/admin-login" style={{ marginLeft: 8, padding: '8px 16px', borderRadius: 6, background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontWeight: 500, textDecoration: 'none' }}>Login</Link>
      </nav>
    </header>
  );
};

export default Header; 