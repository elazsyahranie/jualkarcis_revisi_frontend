import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./paymentPage.module.css";
import axiosApiIntances from "../../Utils/axios";
import googlePayLogo from "../Components/logos_google-pay.png";
import VisaLogo from "../Components/logos_visa.png";
import GoPayLogo from "../Components/logo_gopay.png";
import PayPalLogo from "../Components/logos_paypal.png";
import DanaLogo from "../Components/logo_dana.png";
import LogoBCA from "../Components/logo_bca.png";
import LogoBRI from "../Components/logo_bri_smaller.png";
import OVOLogo from "../Components/ovo.png";

class PaymentPage extends Component {
  componentDidMount() {
    // this.postBookingSeat();
  }

  paymentMethod = (event) => {
    sessionStorage.setItem("paymentMethod", event.target.name);
  };

  postBookingSeat = () => {
    console.log("Post Booking!");
    const bookingSeatSession = sessionStorage.getItem("bookingSeat");
    const bookingSeatLengthSession = parseInt(
      sessionStorage.getItem("bookingSeatLength")
    );
    const data = {
      bookingSeat: bookingSeatLengthSession,
      bookingSeatLocation: bookingSeatSession,
    };
    axiosApiIntances
      .post("booking/booking-seat", data)
      .then((res) => {
        sessionStorage.setItem("bookingSeatId", res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
    // this.postBooking();
  };

  payYourOrder = () => {
    if ("paymentMethod" in sessionStorage) {
      const data = {
        bookingStatus: 1,
      };
      console.log(data);
    } else {
      console.log("Please choose one payment method!");
    }
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    // console.log(userId);
    this.props.history.push(`/edit-profile/${userId}`);
  };

  handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const movieName = sessionStorage.getItem("movie");
    const premiereName = sessionStorage.getItem("premiere");
    const bookingSeat = sessionStorage.getItem("bookingSeat");
    const totalPaymentSession = sessionStorage.getItem("totalPayment");
    const bookingSeatSplit = bookingSeat.split(",");
    console.log(bookingSeatSplit);
    return (
      <>
        <NavBar
          toHandleLogOut={this.handleLogOut.bind(this)}
          toGoToEditProfile={this.goToEditProfile.bind(this)}
        />
        <div className={style.greyBackground}>
          <Container className="pt-5 position-relative">
            <Row className="position-relative">
              <Col lg={7} md={7} sm={12} xs={12}>
                <h5>Payment Info</h5>
                <div className={`${style.fluidWhiteBackground}`}>
                  <div className="px-4">
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
                      <span>{bookingSeat}</span>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between pb-4">
                      <span>Total Payment</span>
                      <span>{totalPaymentSession}</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className={`${style.personalInfoBox}`}
              >
                <h5>Personal Info</h5>
                <div className={`${style.fluidWhiteBackground}`}>
                  <div className="px-3 py-3">
                    <Form>
                      <div className="pb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" />
                      </div>
                      <div className="pb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" />
                      </div>
                      <div className="pb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Phone Number" />
                      </div>
                    </Form>
                  </div>
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
                      name="googlePay"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={VisaLogo}
                      alt=""
                      name="Visa"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={GoPayLogo}
                      alt=""
                      name="GoPay"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={PayPalLogo}
                      alt=""
                      name="PayPal"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={DanaLogo}
                      alt=""
                      name="Dana"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={LogoBCA}
                      alt=""
                      name="BCA"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={LogoBRI}
                      alt=""
                      name="BRI"
                      onClick={(event) => this.paymentMethod(event)}
                      className={`img-fluid ${style.logoCenter}`}
                    ></img>
                  </Col>
                  <Col lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={OVOLogo}
                      alt=""
                      name="OVO"
                      onClick={(event) => this.paymentMethod(event)}
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
                <Button className={style.bottomPurpleButtonOutline}>
                  Previous step
                </Button>
                <Button
                  onClick={() => this.payYourOrder()}
                  className={style.bottomPurpleButton}
                >
                  Pay your order
                </Button>
              </div>
            </Col>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(PaymentPage);
