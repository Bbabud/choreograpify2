import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Step from "./step";

class Floor extends Component {
  render() {
    const { floorWidth, floorHeight, floorLeft, floorSteps } = this.props.floor;
    return (
      <Container
        className="DanceFloor"
        style={{
          width: floorWidth,
          height: floorHeight,
          left: floorLeft
        }}
      >
        {floorSteps.map(step => (
          <Step
            id={"#floor" + step.id}
            key={step.id}
            image={this.props.image}
            step={step}
            onAddStep={this.props.onAddStep}
            onHighlighted={this.props.onHighlighted}
            floor={this.props.floor}
            onPosition={this.props.onPosition}
          />
        ))}
      </Container>
    );
  }
}

export default Floor;
