import React, { Component } from "react";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import Draggable from "react-draggable";
import Images from "../files/images";

class Step extends Component {
  state = {
    activeDrags: 0,
    windowScrollY: 0,
    controlledPosition: {
      x: 0,
      y: 0
    }
  };

  constructor(id, name, startDegree, fD, sD, description, draggable) {
    super();
    this.id = id;
    this.name = name;
    this.startDegree = startDegree;
    this.forwardDistance = fD;
    this.sidewaysDistance = sD;
    this.description = description;
    this.draggable = draggable;
  }

  handleHighlightedColor(step) {
    return step.highlighted ? "rgba(244,151,151,0.6)" : "transparent";
  }

  onStart = () => {
    this.setState(prevState => ({
      activeDrags: ++prevState.activeDrags
    }));
  };

  onStop = () => {
    this.setState(prevState => ({
      activeDrags: --prevState.activeDrags
    }));
  };

  handleImage = name => {
    return Images.adata.Waltz.filter(step => step.name === name)[0].image;
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  handleState = () => {
    this.props.onPosition(this.props.id, this.state.controlledPosition);
    this.onStop();
  };

  handleControlledPosition = () => {
    if (this.props.step.position !== undefined) {
      const { x, y } = this.props.step.position;
      this.setState({ controlledPosition: { x, y } });
    }
    this.onStart();
  };

  /*   componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  } */

  handleScroll = e => {
    e.preventDefault();
  };

  onCalculateWidth = () => {
    return this.props.floor.stepWidth * this.props.step.sidewaysDistance;
  };

  onCalculateHeight = () => {
    return this.props.floor.stepHeight * this.props.step.forwardDistance;
  };

  render() {
    const step = this.props.step;
    const id = this.props.id;
    return (
      <Draggable
        disabled={!step.draggable}
        //grid={[stepWidth / 2, stepHeight / 2]}
        bounds="parent"
        onStart={this.handleControlledPosition}
        position={step.position}
        onDrag={this.onControlledDrag}
        onStop={this.handleState}
      >
        <div
          className="stepBox"
          style={{
            width: this.onCalculateWidth(),
            height: this.onCalculateHeight()
          }}
        >
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">{step.name}</Tooltip>}
            onScroll={this.handleScroll.bind(this)}
          >
            <Container
              id={id}
              className="DndStep"
              style={{
                width: this.onCalculateWidth(),
                height: this.onCalculateHeight(),
                backgroundImage: "url(" + this.handleImage(step.name) + ")",
                backgroundSize: `${this.onCalculateWidth()}px ${this.onCalculateHeight()}px`,
                backgroundColor: this.handleHighlightedColor(step),
                transform: `rotate(${step.startDegree}deg)`
              }}
              alt={step.name}
              onClick={() => {
                this.props.onAddStep(step, id);
                this.props.onHighlighted(id);
              }}
            >
              {this.props.children}
            </Container>
          </OverlayTrigger>
        </div>
      </Draggable>
    );
  }
}

export default Step;
