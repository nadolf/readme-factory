import React, { useState } from "react";
import "../styles/ReadmeGenerator.css";
import ReactMarkdown from "react-markdown";
import { FaPlus, FaTrash, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import GeneratorNav from "../components/GeneratorNav";

export default function ReadmeGenerator() {
  const [sections, setSections] = useState([{ type: "title", content: "Project Title" }]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("markdown");

  const availableSections = [
    "description",
    "installation",
    "usage",
    "license",
    "contributing",
  ];

  const sectionTemplates = {
    description: "Provide a description of your project.",
    installation: "Provide installation instructions.",
    usage: "Provide usage instructions.",
    license: "Specify the license for your project.",
    contributing: "Describe how others can contribute to your project.",
  };

  const addSection = (sectionType) => {
    if (sections.find((section) => section.type === sectionType)) {
      alert(`${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} section already added.`);
      return;
    }

    const newSection = { type: sectionType, content: sectionTemplates[sectionType] || "" };
    setSections([...sections, newSection]);
    setIsDropdownVisible(false);
  };

  const deleteSection = (index) => setSections(sections.filter((_, i) => i !== index));

  const resetSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].content = sectionTemplates[updatedSections[index].type] || "";
    setSections(updatedSections);
  };

  const updateSection = (index, content) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  const moveSectionUp = (index) => {
    if (index === 0) return;
    const updatedSections = [...sections];
    [updatedSections[index], updatedSections[index - 1]] = [updatedSections[index - 1], updatedSections[index]];
    setSections(updatedSections);
  };

  const moveSectionDown = (index) => {
    if (index === sections.length - 1) return;
    const updatedSections = [...sections];
    [updatedSections[index], updatedSections[index + 1]] = [updatedSections[index + 1], updatedSections[index]];
    setSections(updatedSections);
  };

  const generateMarkdown = () => {
    let markdown = `# ${sections.find((section) => section.type === "title")?.content || "My Project"}\n\n`;

    sections.forEach((section) => {
      if (section.type !== "title") {
        markdown += `## ${section.type.charAt(0).toUpperCase() + section.type.slice(1)}\n${section.content}\n\n`;
      }
    });

    return markdown;
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown()).then(() => alert("Markdown copied to clipboard!"));
  };

  return (
    <div>
      <GeneratorNav />

      <div className="generator-container">
        <div className="content-wrapper">
          <div className="sidebar">
            <button className="add-button" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
              <FaPlus size={30} />
            </button>

            {isDropdownVisible && (
              <div className="dropdown">
                {availableSections
                  .filter((section) => !sections.some((s) => s.type === section))
                  .map((section) => (
                    <div key={section} onClick={() => addSection(section)} className="dropdown-option">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="sections-container">
            {sections.map((section, index) => (
              <div key={index} className="section-card">
                <label>
                  {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                  <textarea value={section.content} onChange={(e) => updateSection(index, e.target.value)} />
                </label>

                <div className="section-actions">
                  <button onClick={() => resetSection(index)}>
                    <VscDebugRestart />
                  </button>
                  <button onClick={() => deleteSection(index)}>
                    <FaTrash />
                  </button>
                  <button onClick={() => moveSectionUp(index)} disabled={index === 0}>
                    <FaAngleUp />
                  </button>
                  <button onClick={() => moveSectionDown(index)} disabled={index === sections.length - 1}>
                    <FaAngleDown />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-container">
            <div className="tabs">
              <h3 className={activeTab === "markdown" ? "active-tab" : ""} onClick={() => setActiveTab("markdown")}>
                Markdown
              </h3>
              <h3 className={activeTab === "preview" ? "active-tab" : ""} onClick={() => setActiveTab("preview")}>
                Preview
              </h3>
            </div>

            {activeTab === "markdown" ? (
              <pre className="markdown-area">{generateMarkdown()}</pre>
            ) : (
              <div className="preview-area">
                <ReactMarkdown>{generateMarkdown()}</ReactMarkdown>
              </div>
            )}

            <div className="button-container">
              <button onClick={downloadMarkdown}>Download README.md</button>
              <button onClick={copyToClipboard}>Copy Markdown</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
