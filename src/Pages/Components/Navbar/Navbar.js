import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import TickitzLogo from "../Tickitz_2.png";
import { Router } from "react-router";

class NavBar extends Component {
  render() {
    console.log(this.props);
    const { toHandleLogOut } = this.props;
    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={TickitzLogo} alt=""></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/landing-page">Home</Nav.Link>
              <Nav.Link href="#link">Payment</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Button
                variant="danger"
                onClick={(event) => toHandleLogOut(event)}
              >
                Log out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
