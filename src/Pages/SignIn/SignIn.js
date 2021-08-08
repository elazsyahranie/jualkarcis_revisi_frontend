import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loginUser } from "../../redux/action/User";
import { connect } from "react-redux";
import style from "./SignIn.module.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
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
    console.log(this.state.form);
    this.props
      .loginUser(this.state.form)
      .then((res) => {
        console.log(res);
        console.log(res.action.payload.data.data);
        localStorage.setItem("token", res.action.payload.data.data.token);
        window.setTimeout(() => {
          this.props.history.push({
            pathname: `/landing-page`,
            search: new URLSearchParams({
              page: 1,
              sort: "movie_id ASC",
            }).toString(),
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
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
