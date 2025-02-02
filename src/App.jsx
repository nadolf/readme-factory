import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import ReadmeGenerator from "./pages/ReadmeGenerator";
import "./styles/Index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/generator" element={<ReadmeGenerator/>}/>
      </Routes>
    </Router>
  )
}

export default App
