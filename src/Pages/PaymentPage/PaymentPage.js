import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./paymentPage.module.css";

class PaymentPage extends Component {
  render() {
    const movieName = sessionStorage.getItem("movie");
    const premiereName = sessionStorage.getItem("premiere");
    return (
      <>
        <NavBar />
        <div className={style.greyBackground}>
          <Container className="pt-5">
            <Row>
              <h5>Payment Info</h5>
              <Col
                lg={7}
                md={7}
                sm={12}
                xs={12}
                className={style.fluidWhiteBackground}
              >
                <div className="d-flex justify-content-between pt-4">
                  <span>Date & time</span>
                  <span>Date and Time unknown</span>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                  <span>Movie Name</span>
                  <span>{movieName}</span>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                  <span>Cinema Name</span>
                  <span>{premiereName}</span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

export default PaymentPage;
