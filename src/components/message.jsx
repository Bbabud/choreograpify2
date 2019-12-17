import React, { setShow } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const message = ({ msg }) => {
  return (
    <Alert variant="info" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>{msg}</Alert.Heading>
    </Alert>
  );
};

message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default message;
