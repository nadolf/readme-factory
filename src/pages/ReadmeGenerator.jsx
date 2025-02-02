import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  FaPlus,
  FaTrash,
  FaXmark,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa6";
import GeneratorNav from "../components/GeneratorNav";
import { VscDebugRestart } from "react-icons/vsc";

export default function ReadmeGenerator() {
  const [sections, setSections] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const availableSections = [
    "title",
    "description",
    "installation",
    "usage",
    "license",
    "contributing",
  ];

  // Add a new section if not already added
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
      content: "", // Empty content initially
    };
    setSections([...sections, newSection]);
    setIsDropdownVisible(false); // Hide dropdown after adding
  };

  // Delete a section
  const deleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  // Reset a section to its original empty content
  const resetSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].content = "";
    setSections(updatedSections);
  };

  // Update the content of a section
  const updateSection = (index, content) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  // Move a section up in the order
  const moveSectionUp = (index) => {
    if (index === 0) return;
    const updatedSections = [...sections];
    const temp = updatedSections[index];
    updatedSections[index] = updatedSections[index - 1];
    updatedSections[index - 1] = temp;
    setSections(updatedSections);
  };

  // Move a section down in the order
  const moveSectionDown = (index) => {
    if (index === sections.length - 1) return;
    const updatedSections = [...sections];
    const temp = updatedSections[index];
    updatedSections[index] = updatedSections[index + 1];
    updatedSections[index + 1] = temp;
    setSections(updatedSections);
  };

  // Generate markdown based on sections
  const generateMarkdown = () => {
    let markdown = `# ${
      sections.find((section) => section.type === "title")?.content || ""
    }\n\n`;

    sections.forEach((section) => {
      switch (section.type) {
        case "description":
          markdown += `## Description\n${section.content}\n\n`;
          break;
        case "installation":
          markdown += `## Installation\n\`\`\`\n${section.content}\n\`\`\`\n\n`;
          break;
        case "usage":
          markdown += `## Usage\n${section.content}\n\n`;
          break;
        case "license":
          markdown += `## License\n${section.content}\n\n`;
          break;
        case "contributing":
          markdown += `## Contributing\n${section.content}\n\n`;
          break;
        default:
          break;
      }
    });

    return markdown;
  };

  // Generate non-markdown preview
  const generatePreview = () => {
    let preview = `# ${
      sections.find((section) => section.type === "title")?.content || ""
    }\n\n`;

    sections.forEach((section) => {
      switch (section.type) {
        case "description":
          preview += `## Description\n${section.content}\n\n`;
          break;
        case "installation":
          preview += `## Installation\n${section.content}\n\n`;
          break;
        case "usage":
          preview += `## Usage\n${section.content}\n\n`;
          break;
        case "license":
          preview += `## License\n${section.content}\n\n`;
          break;
        case "contributing":
          preview += `## Contributing\n${section.content}\n\n`;
          break;
        default:
          break;
      }
    });

    return preview;
  };

  // Handle markdown download
  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  // Copy the generated markdown to clipboard
  const copyToClipboard = () => {
    const markdown = generateMarkdown();
    navigator.clipboard.writeText(markdown).then(() => {
      alert("Markdown copied to clipboard!");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <GeneratorNav />
      <div>
        <button onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
          <FaPlus />
        </button>
        {isDropdownVisible && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              display: "inline-block",
            }}
          >
            <select
              onChange={(e) => addSection(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select a section to add
              </option>
              {availableSections
                .filter((section) => !sections.find((s) => s.type === section))
                .map((section) => (
                  <option key={section} value={section}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            margin: "10px 0",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <label>
            {section.type.charAt(0).toUpperCase() + section.type.slice(1)}:
            <textarea
              value={section.content}
              onChange={(e) => updateSection(index, e.target.value)}
              style={{ width: "100%", height: "100px" }}
            />
          </label>

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => resetSection(index)}>
              <VscDebugRestart />
            </button>
            <button onClick={() => deleteSection(index)}>
              <FaTrash />
            </button>
            <button onClick={() => moveSectionUp(index)} disabled={index === 0}>
              <FaAngleUp />
            </button>
            <button
              onClick={() => moveSectionDown(index)}
              disabled={index === sections.length - 1}
            >
              <FaAngleDown />
            </button>
          </div>
        </div>
      ))}
      <div>
        <h2>Markdown:</h2>
        <pre>{generateMarkdown()}</pre>
      </div>

      <div>
        <h2>Preview</h2>
        <div
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            whiteSpace: "pre-wrap",
            backgroundColor: "#f6f8fa",
            borderRadius: "5px",
            wordBreak: "break-word",
            maxWidth: "800px",
          }}
        >
          <ReactMarkdown>{generateMarkdown()}</ReactMarkdown>
        </div>
      </div>
      <div>
        <button onClick={downloadMarkdown}>Download README.md</button>
        <button onClick={copyToClipboard}>Copy Markdown</button>
      </div>
    </div>
  );
}
