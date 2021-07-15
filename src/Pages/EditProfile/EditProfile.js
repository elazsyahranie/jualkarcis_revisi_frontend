import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./EditProfile.module.css";

class EditProfile extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className={style.greyBackground}>
          <Container className={style.mainContainer}>
            <Row className="pt-3">
              <Col lg={4} md={4} sm={12} xs={12} className="pb-3">
                <div className={`${style.whiteBox}`}>
                  <div className="d-flex justify-content-between px-3 py-3">
                    <span>INFO</span>
                    <span>INFO</span>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={7} sm={12} xs={12}>
                <div className={`${style.whiteBox}`}>
                  <span className="d-block fw-bold px-3 py-3">
                    Details Information
                  </span>
                  <hr></hr>
                  <Form>
                    <Row className="px-3 py-3">
                      <Col md>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                      </Col>
                      <Col md>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                      </Col>
                    </Row>
                    <Row className="px-3 pb-3">
                      <Col md>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="emai" placeholder="Email" />
                      </Col>
                      <Col md>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone" placeholder="Phone Number" />
                      </Col>
                    </Row>
                  </Form>
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

export default EditProfile;
