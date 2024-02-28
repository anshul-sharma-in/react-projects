import React from "react";
import "./TextToFile.css";

class TextToFile extends React.Component {
  state = {
    textContent: "",
  };
  handleTextChange = event => {
    this.setState({ textContent: event.target.value });
  };
  handleDownload = () => {
    const { textContent } = this.state;
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text_file.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };
  render() {
    return (
      <div className="text-to-file-container">
        <h2>Text to File</h2>
        <textarea
          rows={10}
          value={this.state.textContent}
          onChange={this.handleTextChange}
          placeholder="Enter your text here..."
        />
        <button
          onClick={this.handleDownload}
          disabled={!this.state.textContent}
        >
          Download Text File
        </button>
      </div>
    );
  }
}
export default TextToFile;
