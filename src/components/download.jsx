import React, { Component } from "react";
import { saveAs } from "file-saver";
import FolderDirectory from "../files/floor.json";

class Download extends Component {
  handleDownload = () => {
    let fs = require("browserify-fs");
    fs.readFile(FolderDirectory, "utf-8", (err, data) => {
      const blob = new Blob([data], { type: "application/json" });
      saveAs(blob, "coreographfy.json");
    });
  };
  render() {
    return (
      <button
        onClick={this.handleDownload}
        className="btn btn-secondary btn-block mt-4"
      >
        Download
      </button>
    );
  }
}

export default Download;
