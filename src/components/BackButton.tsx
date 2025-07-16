import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        zIndex: 10,
        background: "white",
        border: "none",
        fontSize: 24,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        borderRadius: 24,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      aria-label="Go back"
    >
      ×
    </button>
  );
};

export default BackButton; 