import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//stateless functional component
const NavBar = ({ onSave, onLoad }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Coreograpify </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="https://github.com/Bbabud/choreograpify">
            GitHub
          </Nav.Link>
          <NavDropdown title="File" id="basic-nav-dropdown">
            <NavDropdown.Item href="#save" onClick={onSave}>
              Save
            </NavDropdown.Item>
            <NavDropdown.Item href="#load" onClick={onLoad}>
              Load
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="https://www.linkedin.com/in/babud-bence-25568714a/"
              target="_blank"
            >
              LinkedIn
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
