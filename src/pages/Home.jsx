import React from "react";
import "../styles/Home.css"
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <header>
        <div>README Factory</div>
        <div>Light/Dark Mode</div>
      </header>
      <div class="content-container">
      <h1>Generate Your README Effortlessly with Our Website</h1>
      <h2>
        Our platform lets you quickly create clear, customizable README files
        for your projects
      </h2>
      <Link to="/generator">
        <button>Get Started</button>
      </Link>
            <div>photo</div>
      </div>
      <footer>Footer</footer>
    </div>
  );
}
