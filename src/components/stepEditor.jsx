import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
class FloorEditor extends Component {
  render() {
    const { onRotateRight, onRotateLeft, onRemoveStep } = this.props.onStep;
    return (
      <Fragment>
        {" "}
        <Button onClick={onRotateRight} className="btn btn-secondary btn-block">
          RotateRight
        </Button>{" "}
        <Button onClick={onRotateLeft} className="btn btn-secondary btn-block">
          RotateLeft
        </Button>{" "}
        <Button onClick={onRemoveStep} className="btn btn-secondary btn-block">
          RemoveStep
        </Button>{" "}
      </Fragment>
    );
  }
}

export default FloorEditor;
