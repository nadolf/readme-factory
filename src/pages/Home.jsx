import React from "react";
import "../styles/Home.css";
import HomeNav from "../components/HomeNav";
import readmeFactoryImage from "../assets/readmeFactoryImage.png";
import { Link } from "react-router-dom";
import { useMode } from "../components/ModeContext";

export default function HomePage() {
  const { mode } = useMode();

  return (
    <div>
      <HomeNav />
      <div className="content-container">
        <h1 className={`main-text ${mode}`}>
          Generate Your <span className="readme-text">README</span> Effortlessly with Our Website
        </h1>
        <h2 className={`sub-text ${mode}`}>
          Our platform lets you quickly create clear, customizable README files
          for your projects
        </h2>
        <Link to="/generator">
          <button className="get-started-button">Get Started</button>
        </Link>
        <img className="generator-image" src={readmeFactoryImage} />
      </div>
      <footer className="footer">
        <p>&copy; 2025 README Factory. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
