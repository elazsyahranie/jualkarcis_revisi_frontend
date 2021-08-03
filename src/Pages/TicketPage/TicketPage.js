import React, { Component } from "react";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./TicketPage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import TickitzLogo from "../Components/Tickitz_2.png";

class TicketPage extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container fluid className={`${style.blueBackground} p-5`}>
          <div className={`${style.lighterBackground}`}>
            <h5 className="text-center py-4">Proof of Payment</h5>
            <div>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <img src={TickitzLogo} alt="" className="img-fluid"></img>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <span>Admit One</span>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

export default TicketPage;
