import React from "react";
import CryptoJS from "crypto-js";
import "./TextFileCrypto.css";
class FileEncryptor extends React.Component {
  state = {
    fileContent: "",
    secretKey: "",
    encryptedContent: "",
  };
  handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const fileContent = e.target.result;
      this.setState({ fileContent });
    };
    reader.readAsText(file);
  };
  handleKeyChange = event => {
    const secretKey = event.target.value;
    this.setState({ secretKey });
  };
  handleEncrypt = () => {
    const { fileContent, secretKey } = this.state;
    const encryptedContent = CryptoJS.AES.encrypt(
      fileContent,
      secretKey,
    ).toString();
    this.setState({ encryptedContent });
  };
  handleDownload = () => {
    const { encryptedContent } = this.state;
    const element = document.createElement("a");
    const file = new Blob([encryptedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "encrypted_file.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };
  render() {
    return (
      <div className="text-file-crypto-container">
        <h2>File Encryptor</h2>
        <input
          type="file"
          accept=".txt"
          className="text-file-crypto-input"
          onChange={this.handleFileChange}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Secret Key"
          className="text-file-crypto-input"
          onChange={this.handleKeyChange}
        />
        <br />
        <button
          className="text-file-crypto-button"
          onClick={this.handleEncrypt}
        >
          Encrypt
        </button>
        <br />
        <button
          className="text-file-crypto-button"
          onClick={this.handleDownload}
          disabled={!this.state.encryptedContent}
        >
          Download Encrypted File
        </button>
      </div>
    );
  }
}
export default FileEncryptor;
