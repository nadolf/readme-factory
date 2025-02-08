import React, { useState } from "react";
import "../styles/ReadmeGenerator.css";
import ReactMarkdown from "react-markdown";
import { FaPlus, FaTrash, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import GeneratorNav from "../components/GeneratorNav";

export default function ReadmeGenerator() {
  const [sections, setSections] = useState([
    { type: "Title & Description", content: "Project Title\nDescription Here" },
  ]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("markdown");

  const availableSections = [
    "Tech",
    "Features",
    "Installation",
    "Usage",
    "Badges",
    "Contributing",
    "License"
  ];

  const sectionTemplates = {
    Tech: "**Frontend:** React.js, TailwindCSS\n\n**Backend:** Node.js, Express.js\n\n**Database:** MongoDB\n\n**Other Technologies:**\n- Firebase\n- Docker\n- AWS  ",
    Features: "- Feature 1\n- Feature 2\n- Feature 3",
    Installation: "### Prerequisites\n- Requirement 1\n- Requirement 2\n\n### Steps\n1. Clone the repo:\n```sh\ngit clone https://github.com/your-username/project-name.git\n```\n2. Navigate to the project folder:\n```sh\ncd project-name\n```\n3. Install dependencies:\n```sh\nnpm install  # or pip install -r requirements.txt\n```\n4. Run the project:\n```sh\nnpm start",
    Usage: "Provide usage instructions\n\n```npm install```",
    Badges: "Add badges here:\n\n[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)\n\n[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)\n\n[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)",
    Contributing: "Describe how others can contribute to your project.",
    License: "Specify the license for your project.",
  };

  const addSection = (sectionType) => {
    if (sections.find((section) => section.type === sectionType)) {
      alert(
        `${
          sectionType.charAt(0).toUpperCase() + sectionType.slice(1)
        } section already added.`
      );
      return;
    }
    const newSection = {
      type: sectionType,
      content: sectionTemplates[sectionType] || "",
    };
    setSections([...sections, newSection]);
    setIsDropdownVisible(false);
  };

  const deleteSection = (index) =>
    setSections(sections.filter((_, i) => i !== index));

  const resetSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].content =
      sectionTemplates[updatedSections[index].type] || "";
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
    [updatedSections[index], updatedSections[index - 1]] = [
      updatedSections[index - 1],
      updatedSections[index],
    ];
    setSections(updatedSections);
  };

  const moveSectionDown = (index) => {
    if (index === sections.length - 1) return;
    const updatedSections = [...sections];
    [updatedSections[index], updatedSections[index + 1]] = [
      updatedSections[index + 1],
      updatedSections[index],
    ];
    setSections(updatedSections);
  };

  const generateMarkdown = () => {
    let markdown = `# ${
      sections.find((section) => section.type === "Title & Description")
        ?.content || "My Project"
    }\n\n`;

    sections.forEach((section) => {
      if (section.type !== "Title & Description") {
        markdown += `## ${
          section.type.charAt(0).toUpperCase() + section.type.slice(1)
        }\n${section.content}\n\n`;
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
    navigator.clipboard
      .writeText(generateMarkdown())
      .then(() => alert("Markdown copied to clipboard!"));
  };

  return (
    <div>
      <GeneratorNav onDownload={downloadMarkdown} onCopy={copyToClipboard} />

      <div className="generator-container">
        <div className="content-wrapper">
          <div className="sidebar">
            <button
              className="add-button"
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <FaPlus size={30} />
            </button>

            {isDropdownVisible && (
              <div className="dropdown">
                {availableSections
                  .filter(
                    (section) => !sections.some((s) => s.type === section)
                  )
                  .map((section) => (
                    <div
                      key={section}
                      onClick={() => addSection(section)}
                      className="dropdown-option"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="sections-container">
            {sections.map((section, index) => (
              <div key={index} className="section-card">
                <h3 className="section-label">
                  {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                </h3>
                <textarea
                  className="section-textarea"
                  value={section.content}
                  onChange={(e) => updateSection(index, e.target.value)}
                />

                <div className="section-actions">
                  <button
                    className="section-action-buttons"
                    onClick={() => resetSection(index)}
                  >
                    <VscDebugRestart />
                  </button>
                  <button
                    className="section-action-buttons"
                    onClick={() => deleteSection(index)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="section-action-buttons"
                    onClick={() => moveSectionUp(index)}
                    disabled={index === 0}
                  >
                    <FaAngleUp />
                  </button>
                  <button
                    className="section-action-buttons"
                    onClick={() => moveSectionDown(index)}
                    disabled={index === sections.length - 1}
                  >
                    <FaAngleDown />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-container">
            <div className="tabs">
              <h3
                className={activeTab === "markdown" ? "active-tab" : ""}
                onClick={() => setActiveTab("markdown")}
              >
                Markdown
              </h3>
              <h3
                className={activeTab === "preview" ? "active-tab" : ""}
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </h3>
            </div>
            <div className="preview-content">
              {activeTab === "markdown" ? (
                <pre className="markdown-area">{generateMarkdown()}</pre>
              ) : (
                <div className="preview-area">
                  <ReactMarkdown>{generateMarkdown()}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
