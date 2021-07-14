import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import TickitzLogo from "../Tickitz_2.png";

class NavBar extends Component {
  render() {
    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={TickitzLogo} alt=""></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Payment</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
