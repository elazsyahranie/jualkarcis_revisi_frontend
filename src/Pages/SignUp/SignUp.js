import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { registerUser } from "../../redux/action/User";
import { connect } from "react-redux";
import style from "./SignUp.module.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      iHaveAgree: false,
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

  agreeCheckbox = () => {
    if (this.state.iHaveAgree === false) {
      this.setState({
        iHaveAgree: true,
      });
      console.log("True");
    } else if (this.state.iHaveAgree === true) {
      this.setState({
        iHaveAgree: false,
      });
      console.log("False");
    }
  };

  handleRegister = (event) => {
    event.preventDefault();
    if (this.state.iHaveAgree === true) {
      console.log(this.state.form);
      this.props
        .registerUser(this.state.form)
        .then((res) => {
          console.log(res);
          console.log(res.action.payload.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please retry!");
    }
  };

  toLogIn = () => {
    console.log("Testing to login!");
    this.props.history.push("/");
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
              className={`d-none d-md-block ${style.leftCol}`}
            ></Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="pt-5">
                <div className="pt-5">
                  <Row className="pt-4 justify-content-center">
                    <div className={style.formWidth}>
                      <h5 className="fw-bold">Fill your additional details</h5>
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
                        <div className="mt-3">
                          <Form.Check
                            type="checkbox"
                            onClick={() => {
                              this.agreeCheckbox();
                            }}
                            label="I have agree to terms & conditions!"
                          />
                        </div>
                        <Button
                          type="submit"
                          className={`mt-3 w-100 ${style.myPurpleButton}`}
                          onClick={(event) => this.handleRegister(event)}
                        >
                          Submit
                        </Button>
                        <div className="mt-3">
                          <span className="d-block text-center">
                            Do you already have an account?{" "}
                            <span
                              onClick={() => this.toLogIn()}
                              className={style.toLogIn}
                            >
                              Log in!
                            </span>
                          </span>
                        </div>
                      </Form>
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
const mapDispatchToProps = { registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
