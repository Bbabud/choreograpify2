import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import StepCard from "./card";
import WaltzSteps from "../files/waltzSteps.json";
import Images from "../files/images";

class Counters extends Component {
  state = {
    danceTypes: [
      { id: 1, name: "Waltz" },
      { id: 2, name: "Tango" },
      { id: 3, name: "Quick-step" }
    ]
  };

  handleImage = name => {
    return Images.adata.Waltz.filter(step => step.name === name)[0].image;
  };

  render() {
    return (
      <React.Fragment>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Tools
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Accordion className="Dances" defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Standard
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Accordion defaultActiveKey="0">
                          <Card className="CounterRow">
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              Waltz
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                {WaltzSteps.steps.map(step => (
                                  <StepCard
                                    id={"#counter" + step.id}
                                    key={step.id}
                                    image={this.handleImage(step.name)}
                                    step={step}
                                    onAddStep={this.props.onAddStep}
                                    onHighlighted={this.props.onHighlighted}
                                  />
                                ))}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                              Tango
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>To be continued...</Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Latin
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>To be continued...</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </React.Fragment>
    );
  }
}

export default Counters;
