import React, { Component } from "react";
import {
  Container,
  Alert,
  Row,
  Col,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { loginUser } from "../../redux/action/Auth";
import { connect } from "react-redux";
import style from "./SignIn.module.css";
import TickitzWhiteLogo from "../Components/tickitz_1.png";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      logInError: "",
      showWrongPasswordAlert: false,
      showEmailNotRegisteredAlert: false,
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    // console.log(this.state.form);
    this.props
      .loginUser(this.state.form)
      .then((res) => {
        localStorage.setItem("token", res.action.payload.data.data.token);
        this.props.history.push("/landing-page");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (err.response.data.msg === "Wrong password") {
          this.setState({
            ...this.state,
            showWrongPasswordAlert: true,
            showEmailNotRegisteredAlert: false,
          });
        }
        if (err.response.data.msg === "Email not Registerd") {
          this.setState({
            ...this.state,
            showEmailNotRegisteredAlert: true,
            showWrongPasswordAlert: false,
          });
        }
      });
  };

  closeWrongPasswordAlert = () => {
    this.setState({ ...this.state, showWrongPasswordAlert: false });
  };

  render() {
    const { userEmail, userPassword } = this.state.form;
    return (
      <>
        <Container fluid>
          <Row>
            <Col
              lg={6}
              md={6}
              className={`d-none d-md-block ${style.leftCol} position-relative`}
            >
              <div className={style.tickitzLogoParent}>
                <Image
                  src={TickitzWhiteLogo}
                  alt=""
                  className={`${style.tickitzLogo} img-fluid`}
                ></Image>
                <h2 className={`text-center fw-light`}>Wait, Watch, Wow!</h2>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="pt-5">
                <div className={`pt-5 ${style.rightColPadding}`}>
                  <Row className="pt-4 justify-content-center">
                    <div className={style.formWidth}>
                      <h1 className="fw-bold">Sign In</h1>
                      <span>
                        Sign in with your data that you entered during
                        registration
                      </span>
                      <Form className="pt-4">
                        <Form.Group>
                          <Form.Label>E-Mail</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Insert your email"
                            className={style.myFormControl}
                            name="userEmail"
                            value={userEmail}
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                        <Form.Group className="mt-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Insert your password"
                            className={style.myFormControl}
                            name="userPassword"
                            value={userPassword}
                            onChange={(event) => this.changeText(event)}
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          className={`mt-3 w-100 ${style.myPurpleButton}`}
                          onClick={(event) => this.handleLogin(event)}
                        >
                          Submit
                        </Button>
                      </Form>
                      {this.state.showWrongPasswordAlert && (
                        <div className="my-3">
                          <Alert
                            variant="danger"
                            onClose={() =>
                              this.setState({
                                ...this.state,
                                showWrongPasswordAlert: false,
                              })
                            }
                            dismissible
                          >
                            <div>
                              You entered the <b>wrong password!</b>
                            </div>
                          </Alert>
                        </div>
                      )}
                      {this.state.showEmailNotRegisteredAlert && (
                        <div className="my-3">
                          <Alert
                            variant="danger"
                            onClose={() =>
                              this.setState({
                                ...this.state,
                                showEmailNotRegisteredAlert: false,
                              })
                            }
                            dismissible
                          >
                            <div>
                              Email <b>not registered!</b>
                            </div>
                          </Alert>
                        </div>
                      )}
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

// export default SignIn;
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
