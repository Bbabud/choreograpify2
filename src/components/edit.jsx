import React, { Component } from "react";
import { Card, Accordion } from "react-bootstrap";
import Upload from "./upload";
import Download from "./download";
import FloorEditor from "./floorEditor";
import StepEditor from "./stepEditor";

class Edit extends Component {
  render() {
    const { onUpload, onSave } = this.props.onEdit;
    return (
      <React.Fragment>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Edit
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Accordion defaultActiveKey="2">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Step editor
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <StepEditor onStep={this.props.onEdit} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Floor editor
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <FloorEditor onFloor={this.props.onEdit} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>{" "}
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      File
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        {" "}
                        <Upload onUpload={onUpload} />
                        <Download onSave={onSave} />
                      </Card.Body>
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

export default Edit;
