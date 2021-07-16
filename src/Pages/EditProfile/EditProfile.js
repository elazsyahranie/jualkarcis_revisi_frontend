import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getUserData, updateUserData } from "../../redux/action/User";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axiosApiIntances from "../../Utils/axios";
import style from "./EditProfile.module.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: "",
        userEmail: "",
        userPhone: "",
      },
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    this.getData();
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  getData = () => {
    const userId = this.props.match.params.id;
    this.props
      .getUserData(userId)
      .then((res) => {
        // Untuk update, .then trigger this.getData()
        // Jadi maksudnya, dalam function updateData, buat then, dan di dalam then masukkan lagi getData
        this.setState({
          form: {
            ...this.state.form,
            userName: this.props.auth.data.user_name,
            userEmail: this.props.auth.data.user_email,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateData = (event) => {
    event.preventDefault();
    const userId = this.props.match.params.id;
    const formData = this.state.form;
    this.props
      .updateUserData(userId, formData)
      .then((res) => {
        this.getData(userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.props.auth.data[0].user_email);
    // console.log(this.state.form);
    const { userName, userEmail, userPhone } = this.state.form;
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
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          name="userName"
                          value={userName}
                          onChange={(event) => this.changeText(event)}
                        />
                      </Col>
                    </Row>
                    <Row className="px-3 pb-3">
                      <Col md>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="userEmail"
                          value={userEmail}
                          onChange={(event) => this.changeText(event)}
                        />
                      </Col>
                      <Col md>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="phone"
                          placeholder="Phone Number"
                          name="userPhone"
                          value={userPhone}
                          onChange={(event) => this.changeText(event)}
                        />
                      </Col>
                    </Row>
                    <div className="px-3 py-3">
                      <Button
                        type="submit"
                        onClick={(event) => this.updateData(event)}
                      >
                        Submit
                      </Button>
                    </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});
const mapDispatchtoProps = { getUserData, updateUserData };

export default connect(mapStateToProps, mapDispatchtoProps)(EditProfile);
