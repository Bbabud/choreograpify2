import React, { Component } from "react";
import LayOut from "./components/layout";
import "./css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <LayOut />
      </React.Fragment>
    );
  }
}

export default App;
