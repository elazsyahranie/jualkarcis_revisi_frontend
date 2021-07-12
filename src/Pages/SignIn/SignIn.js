import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../../redux/action/User";
import { connect } from "react-redux";

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { userEmail, userPassword } = this.state.form;
    return (
      <>
        <h2>Sign In Page</h2>
        <Form>
          <Form.Group>
            <Form.Label>E-Mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Insert your email"
              name="userEmail"
              value={userEmail}
              onChange={(event) => this.changeText(event)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insert your password"
              name="userPassword"
              value={userPassword}
              onChange={(event) => this.changeText(event)}
            />
          </Form.Group>
          <Button type="submit" onClick={(event) => this.handleLogin(event)}>
            Submit
          </Button>
        </Form>
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
