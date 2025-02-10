import React from "react";
import { useMode } from "./ModeContext";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";


export default function HomeNav() {
    const { mode, toggleMode } = useMode();
    
    return (
    <div className="container">
      <a href="/"><div className="header-logo">README Factory</div></a>
      <div className="generator-nav-icons">
        <div onClick={toggleMode} className="mode-toggle">
          {mode === "light" ? (
            <MdOutlineLightMode size={30} />
          ) : (
            <MdOutlineModeNight size={30} />
          )}
        </div>
      </div>
    </div>
    )
}