import React, { Component, Fragment } from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import Menu from "./navbar";
import Counters from "./counters";
import Floor from "./floor";
import Edit from "./edit";
import Step from "./step";
import nextId from "react-id-generator";
import FolderDirectory from "../files/floor.json";
import UploadDirectory from "../uploads/upload.json";

class LayOut extends Component {
  state = {
    floorWidth: 640,
    floorHeight: 400,
    floorLeft: 155,
    stepWidth: 40,
    stepHeight: 40,
    zoomRate: 1.1,
    zoomCount: 0,
    stepCount: 0,
    floorSteps: []
  };
  constructor(props) {
    super(props);
    this.onLoad.bind(this);
  }

  onSave = () => {
    let fs = require("browserify-fs");
    const data = JSON.stringify(this.state, null, 2);
    fs.writeFile(FolderDirectory, data, finished);

    function finished(err) {
      fs.close(FolderDirectory, function() {
        console.log("wrote the file successfully");
      });
      console.log("all set.");
      console.log(data);
    }
  };
  onLoad = () => {
    let fs = require("browserify-fs");
    fs.readFile(FolderDirectory, "utf-8", (err, data) => {
      const floor = JSON.parse(data);
      this.setState({
        floorWidth: floor.floorWidth,
        floorHeight: floor.floorHeight,
        floorLeft: floor.floorLeft,
        stepWidth: floor.stepWidth,
        stepHeight: floor.stepHeight,
        zoomCount: floor.zoomCount,
        zoomRate: floor.zoomRate,
        floorSteps: floor.floorSteps
      });
      return floor;
    });
  };

  onUpload = () => {
    let fs = require("browserify-fs");
    fs.readFile(UploadDirectory, "utf-8", (err, data) => {
      console.log(data);
      const floor = JSON.parse(data);
      console.log(floor);
      this.setState({
        floorWidth: floor.floorWidth,
        floorHeight: floor.floorHeight,
        floorLeft: floor.floorLeft,
        stepWidth: floor.stepWidth,
        stepHeight: floor.stepHeight,
        zoomCount: floor.zoomCount,
        zoomRate: floor.zoomRate,
        floorSteps: floor.floorSteps
      });
      return floor;
    });
  };

  onPosition = (id, position) => {
    const { x, y } = position;
    if (id.includes("floor"))
      return this.setState(prevState => ({
        floorSteps: prevState.floorSteps.map(step =>
          "#floor" + step.id === id ? { ...step, position: { x, y } } : step
        )
      }));
    else return null;
  };

  onHighlighted = id => {
    if (id.includes("floor"))
      return this.setState(prevState => ({
        floorSteps: prevState.floorSteps.map(step =>
          "#floor" + step.id === id
            ? { ...step, highlighted: !step.highlighted }
            : step
        )
      }));
    else return null;
  };

  onAddStep = (newStep, token) => {
    const {
      name,
      startDegree,
      forwardDistance,
      sidewaysDistance,
      description
    } = newStep;
    if (token.includes("counter")) {
      this.setState(prevState => ({
        stepCount: prevState.stepCount + 1,
        floorSteps: [
          ...prevState.floorSteps,
          new Step(
            nextId(),
            name,
            startDegree,
            forwardDistance,
            sidewaysDistance,
            description,
            true
          )
        ]
      }));
    }
  };

  onRemoveStep = () => {
    this.setState(prevState => ({
      floorSteps: prevState.floorSteps.filter(step => !step.highlighted)
    }));
  };

  onRotateFloor = () => {
    this.setState(prevState => ({
      floorWidth: prevState.floorHeight,
      floorHeight: prevState.floorWidth,
      floorLeft: (950 - prevState.floorHeight) / 2
    }));
  };

  onClearFloor = () => {
    this.setState({ floorSteps: [] });
  };

  onZoomIn = () => {
    let style = { ...this.state };
    style.zoomCount += 1;
    style.floorWidth *= style.zoomRate;
    style.floorHeight *= style.zoomRate;
    style.floorLeft -= (style.floorWidth - this.state.floorWidth) / 2;
    style.stepWidth *= style.zoomRate;
    style.stepHeight *= style.zoomRate;
    this.setState(style);
  };

  onZoomOut = () => {
    let style = { ...this.state };
    style.zoomCount -= 1;
    style.floorWidth /= style.zoomRate;
    style.floorHeight /= style.zoomRate;
    style.floorLeft -= (style.floorWidth - this.state.floorWidth) / 2;
    style.stepWidth /= style.zoomRate;
    style.stepHeight /= style.zoomRate;
    this.setState(style);
  };

  onRotateRight = () => {
    this.setState(prevState => ({
      floorSteps: prevState.floorSteps.map(step =>
        step.highlighted
          ? { ...step, startDegree: (step.startDegree + 15) % 360 }
          : step
      )
    }));
  };

  onRotateLeft = () => {
    this.setState(prevState => ({
      floorSteps: prevState.floorSteps.map(step =>
        step.highlighted
          ? { ...step, startDegree: (step.startDegree - 15) % 360 }
          : step
      )
    }));
  };

  onWidthSelect = value => {
    this.setState({
      floorWidth:
        value *
        this.state.stepWidth *
        Math.pow(this.state.zoomRate, this.state.zoomCount),
      floorLeft:
        (950 -
          value *
            this.state.stepWidth *
            Math.pow(this.state.zoomRate, this.state.zoomCount)) /
        2
    });
  };

  onHeightSelect = value => {
    this.setState({
      floorHeight:
        value *
        this.state.stepHeight *
        Math.pow(this.state.zoomRate, this.state.zoomCount)
    });
  };

  render() {
    return (
      <Fragment>
        <Menu onSave={this.onSave} onLoad={this.onLoad} />
        <Row className="Surface">
          <Col className="Col-1">
            {" "}
            <Counters
              onAddStep={this.onAddStep}
              onHighlighted={this.onHighlighted}
            />
          </Col>
          <Col className="Col-2" xs={6}>
            <Floor
              floor={this.state}
              onAddStep={this.onAddStep}
              onHighlighted={this.onHighlighted}
              onPosition={this.onPosition}
            />
            <Button variant="Info">
              Zoom{" "}
              <Badge variant="light">
                {Math.round(
                  Math.pow(this.state.zoomRate, this.state.zoomCount) * 100
                )}
                %<span className="sr-only">Zoom in percentage</span>
              </Badge>
            </Button>
          </Col>
          <Col className="Col-3">
            <Edit onEdit={this} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default LayOut;
