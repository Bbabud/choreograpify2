import React, { useState, Fragment } from "react";
import Message from "./message";
import FolderDirectory from "../files/floor.json";

const Upload = props => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [message, setMessage] = useState("");

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const blob = new Blob([file], { type: "application/json" });
    const res = await readFile(blob);
    console.log(res);
    let fs = require("browserify-fs");
    fs.writeFile(FolderDirectory, res, finished);

    function finished(err) {
      fs.close(FolderDirectory, function() {
        setMessage("File uploaded");
        props.onUpload();
        setTimeout(() => setMessage(null), 2000);
      });
    }
  };

  const readFile = file => {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = x => resolve(fr.result);
      fr.readAsText(file);
    });
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form className="input-group" onSubmit={onSubmit}>
        <input
          type="file"
          className="custom-file-input"
          id="inputGroupFile"
          aria-describedby="inputGroupFileAddon"
          onChange={onChange}
        />
        <label className="custom-file-label" htmlFor="inputGroupFile">
          {filename}
        </label>
        <input
          className="btn btn-secondary btn-block mt-1"
          type="submit"
          value="Upload"
          id="inputGroupFileAddon"
        />
      </form>
    </Fragment>
  );
};

export default Upload;
