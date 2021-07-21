import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./paymentPage.module.css";
import googlePayLogo from "../Components/logos_google-pay.png";
import VisaLogo from "../Components/logos_visa.png";
import GoPayLogo from "../Components/logo_gopay.png";
import PayPalLogo from "../Components/logos_paypal.png";
import DanaLogo from "../Components/logo_dana.png";
import LogoBCA from "../Components/logo_bca.png";
import LogoBRI from "../Components/logo_bri_smaller.png";
import OVOLogo from "../Components/ovo.png";

class PaymentPage extends Component {
  render() {
    const movieName = sessionStorage.getItem("movie");
    const premiereName = sessionStorage.getItem("premiere");
    const bookingSeat = sessionStorage.getItem("bookingSeat");
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
                <hr></hr>
                <div className="d-flex justify-content-between">
                  <span>Number of Tickets</span>
                  <span>[UNKNOWN]</span>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between pb-4">
                  <span>Total Payment</span>
                  <span>[UNKNOWN]</span>
                </div>
              </Col>
            </Row>
            <Row className="pt-5">
              <h5>Choose a Payment Method</h5>
              <Col
                lg={7}
                md={7}
                sm={12}
                xs={12}
                className={`${style.fluidWhiteBackground}`}
              >
                <Row className="pt-4 pb-4">
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={googlePayLogo}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={VisaLogo}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={GoPayLogo}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={PayPalLogo}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={DanaLogo}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={LogoBCA}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={LogoBRI}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={OVOLogo}
                      alt=""
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                </Row>
                <hr></hr>
                <span className="d-block text-center pb-4">
                  Pay via cash.{" "}
                  <span className={style.purpleText}>See how it work</span>
                </span>
              </Col>
            </Row>
            <Col lg={7} md={7} sm={12} xs={12} className="pt-4 pb-5">
              <div className="d-flex justify-content-between">
                <Button>Previous step</Button>
                <Button>Pay your order</Button>
              </div>
            </Col>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

export default PaymentPage;
