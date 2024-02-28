import React from "react";
import CryptoJS from "crypto-js";
import "./TextFileDecrypt.css";

class FileDecryptor extends React.Component {
  state = {
    fileContent: "",
    secretKey: "",
    decryptedContent: "",
    error: "",
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
  handleDecrypt = () => {
    const { fileContent, secretKey } = this.state;
    try {
      const bytes = CryptoJS.AES.decrypt(fileContent, secretKey);
      const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
      this.setState({ decryptedContent, error: "" });
    } catch (error) {
      this.setState({
        error: "Decryption failed. Please check the secret key.",
      });
    }
  };
  handleDownload = () => {
    const { decryptedContent } = this.state;
    const element = document.createElement("a");
    const file = new Blob([decryptedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "decrypted_file.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };
  render() {
    const { error } = this.state;
    return (
      <div className="file-decryptor-container">
        <h2>File Decryptor</h2>
        <input type="file" accept=".txt" onChange={this.handleFileChange} />
        <br />
        <input
          type="text"
          placeholder="Enter Secret Key"
          onChange={this.handleKeyChange}
        />
        <br />
        <button onClick={this.handleDecrypt}>Decrypt</button>
        <br />
        {error && <div className="error">{error}</div>}
        {this.state.decryptedContent && (
          <button onClick={this.handleDownload}>Download Decrypted File</button>
        )}
      </div>
    );
  }
}
export default FileDecryptor;
