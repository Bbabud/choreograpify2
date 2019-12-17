import React, { Component, useState } from "react";
import { Modal, Button } from "react-bootstrap";

class Start extends Component {
  state = {
    show: useState().show,
    setShow: useState().setShow
  };

  handleClose = () => {
    this.state.setShow(false);
  };
  handleShow = () => {
    this.state.setShow(true);
  };
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Start;
