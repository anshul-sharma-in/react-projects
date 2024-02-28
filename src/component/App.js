import React from "react";
import Display from "./calculator/Display";
import ButtonPanel from "./calculator/ButtonPanel";
import calculate from "./calculator/logic/calculate";
import DynamicForm from "./dynamic-form/DynamicForm";
import TextFileCrypto from "./text-file-crypto/TextFileCrypto";
import TextFileDecrypt from "./text-file-decrypt/TextFileDecrypt";
import TextToFile from "./text-to-file/TextToFile";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
      activeTab: "home",
    };
  }
  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };
  handleTabClick = tabName => {
    this.setState({ activeTab: tabName });
  };
  renderTabs() {
    const tabs = [
      { name: "home", label: "Home" },
      { name: "calculator", label: "Calculator" },
      { name: "dynamicForm", label: "Dynamic Form" },
      { name: "textFileCrypto", label: "Encrypt File" },
      { name: "textFileDecrypt", label: "Decrypt File" },
      { name: "textToFile", label: "Text to File" },
    ];

    return tabs.map(tab => (
      <button
        key={tab.name}
        className={this.state.activeTab === tab.name ? "active" : ""}
        onClick={() => this.handleTabClick(tab.name)}
      >
        {tab.label}
      </button>
    ));
  }
  renderTabContent() {
    const { next, total, activeTab, sampleFormData } = this.state;
    switch (activeTab) {
      case "home":
        return (
          <div className="home-content">
            <h2>Projects</h2>
            <p>Collection of various React Projects</p>
          </div>
        );
      case "calculator":
        return (
          <div className="calculator-content">
            <h2>Calculator</h2>
            <Display value={next || total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          </div>
        );
      case "dynamicForm":
        return (
          <div className="dynamic-form-content">
            <h2>Dynamic Form</h2>
            <DynamicForm />
          </div>
        );
        case "textFileCrypto":
          return (
            <div className="text-file-crypto-content">
              <h2>Encrypt your files content here</h2>
              <TextFileCrypto />
            </div>
          );
          case "textFileDecrypt":
          return (
            <div className="text-file-decrypt-content">
              <h2>Decrypt your file</h2>
              <TextFileDecrypt />
            </div>
          );
          case "textToFile":
          return (
            <div className="text-to-file-content">
              <h2>Create Text File</h2>
              <TextToFile />
            </div>
          );
      default:
        return null;
    }
  }
  render() {
    return (
      <div className="component-app">
        <div className="tabs">
          {this.renderTabs()}
        </div>
        {this.renderTabContent()}
      </div>
    );
  }
}
export default App;
