import React, { Component } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import TickitzLogo from "../Tickitz_2.png";
import MagnifyingGlass from "../icons/kaca_pembesar.png";

import style from "./Navbar.module.css";

class NavBar extends Component {
  render() {
    // console.log(this.props);
    const { toHandleLogOut, toGoToEditProfile } = this.props;
    return (
      <>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img src={TickitzLogo} alt=""></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className={`justify-content-between me-auto ${style.leftNav}`}
                style={{ width: "16rem" }}
              >
                <Nav.Item>
                  <Nav.Link href="/landing-page">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>Payment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={(event) => toGoToEditProfile(event)}>
                    Profile
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav
                className={`justify-content-between`}
                style={{ width: "15rem" }}
              >
                <Nav.Item>
                  <Nav.Link>Location</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <img
                      src={MagnifyingGlass}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="danger"
                    onClick={(event) => toHandleLogOut(event)}
                  >
                    Log Out
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
