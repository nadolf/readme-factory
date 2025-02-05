import React from "react";
import "../styles/GeneratorNav.css";
import { useMode } from "./ModeContext";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";
import { FaDownload, FaRegCopy } from "react-icons/fa6";

export default function GeneratorNav({ onDownload, onCopy }) {
  const { mode, toggleMode } = useMode();

  return (
    <div className="container">
      <div className="header-logo">README Factory</div>
      <div className="generator-nav-icons">
        <button className="nav-button" onClick={onDownload}>
          <FaDownload size={20} />
        </button>
        <button className="nav-button" onClick={onCopy}>
          <FaRegCopy size={20} />
        </button>
        <div onClick={toggleMode} className="mode-toggle">
          {mode === "light" ? (
            <MdOutlineLightMode size={30} />
          ) : (
            <MdOutlineModeNight size={30} />
          )}
        </div>
      </div>
    </div>
  );
}
