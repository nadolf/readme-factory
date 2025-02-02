import React from "react";
import "../styles/GeneratorNav.css";
import { useMode } from "./ModeContext";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";

export default function GeneratorNav() {
  const { mode, toggleMode } = useMode();
  
  return (
    <div className="container">
      <div className="header-logo">README Factory</div>
      <div className="generator-nav-icons" onClick={toggleMode}>
        {mode === "light" ? (
          <MdOutlineLightMode size={30} />
        ) : (
          <MdOutlineModeNight size={30} />
        )}
      </div>
    </div>
  );
}