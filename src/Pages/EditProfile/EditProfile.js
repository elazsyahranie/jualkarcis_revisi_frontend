import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getUserData,
  updateUserData,
  changeUserPassword,
  updateUserImage,
} from "../../redux/action/User";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import axiosApiIntances from "../../Utils/axios";
import threeDots from "../Components/icons/eva_more-horizontal-fill.png";
import style from "./EditProfile.module.css";
import imgNotFound from "../Components/img-not-found.png";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: "",
        userEmail: "",
        userPassword: "",
        userPhone: "",
      },
      password: {
        userPassword: "",
        confirmPassword: "",
      },
      userImage: "",
    };
  }

  componentDidMount() {
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

  changePassword = (event) => {
    this.setState({
      password: {
        ...this.state.password,
        [event.target.name]: event.target.value,
      },
    });
    // console.log(this.state.password);
  };

  submitPassword = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { userPassword } = this.state.password;
    if (
      this.state.password.userPassword === this.state.password.confirmPassword
    ) {
      this.props
        .changeUserPassword(id, { userPassword })
        .then((res) => {
          console.log(res);
          this.getData(id);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(this.state.password);
      // console.log("Both passwords do match!");
    } else {
      console.log("Both passwords don't match!");
    }
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    console.log(userId);
    this.props.history.push(`/edit-profile/${userId}`);
  };

  // uploadImageTest = () => {
  //   const fileUpload = document.getElementById("FileUpload1");
  //   fileUpload.click();
  //   console.log("Test upload image!");
  // };

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
            userPhone: this.props.auth.data.user_phone,
          },
          userImage: this.props.auth.data.user_profile_picture,
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

  handleImage = (event) => {
    this.setState(
      {
        userImage: event.target.files[0],
      },
      () => this.updateImage()
    );
  };

  // URL.createObjectURL(event.target.files[0])

  // updateImage = () => {
  //   console.log(this.state.form.userImage);
  // };

  updateImage = () => {
    const userId = this.props.match.params.id;
    const fd = new FormData();
    fd.append("image", this.state.userImage);
    axiosApiIntances
      .patch(`auth/updateImage/${userId}`, fd)
      .then((res) => {
        this.getData();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(fd);
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    console.log(this.props);
    const { user_profile_picture } = this.props.auth.data;
    const { userName, userEmail, userPhone } = this.state.form;
    const { userPassword, confirmPassword } = this.state.password;
    return (
      <>
        <NavBar
          toHandleLogOut={this.handleLogOut.bind(this)}
          toGoToEditProfile={this.goToEditProfile.bind(this)}
        />
        <div className={style.greyBackground}>
          <Container className={style.mainContainer}>
            <Row className="pt-3">
              <Col lg={4} md={4} sm={12} xs={12} className="pb-3">
                <div className={`${style.whiteBox}`}>
                  <div className="d-flex justify-content-between px-3 py-3">
                    <span>INFO</span>
                    <img src={threeDots} alt="" className="img-fluid"></img>
                  </div>
                  <div className="px-3 py-3">
                    {/* <input type="file" id="actual-btn" hidden /> */}
                    <Form.Group className={style.formGroupUploadImage}>
                      <div className="position-relative">
                        {this.state.userImage === null ||
                        this.state.userImage === "" ||
                        this.state.userImage === undefined ? (
                          <Image
                            src={imgNotFound}
                            className={style.imgProfile}
                          />
                        ) : (
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_URL}${user_profile_picture}`}
                            className={style.imgProfile}
                          />
                        )}
                        <Form.Label
                          htmlFor="files"
                          className={style.boxUpdateImage}
                        >
                          Jangan di hapus !
                        </Form.Label>
                        <Form.Control
                          type="file"
                          id="files"
                          onChange={(event) => this.handleImage(event)}
                          className={style.updateImage}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="px-3 py-3">
                    <h6 className="text-center">{userName}</h6>
                    <span className="d-block text-center">Moviegoer</span>
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
                    <Row className="px-3">
                      <Col md className="pb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="userEmail"
                          value={userEmail}
                          onChange={(event) => this.changeText(event)}
                        />
                      </Col>
                      <Col md className="pb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
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
                        Update Changes
                      </Button>
                    </div>
                  </Form>
                  <span className="d-block fw-bold px-3 py-3">
                    Account and Privacy
                  </span>
                  <hr></hr>
                  <Form>
                    <Row className="px-3">
                      <Col md className="pb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="userPassword"
                          value={userPassword}
                          onChange={(event) => this.changePassword(event)}
                        ></Form.Control>
                      </Col>
                      <Col md className="pb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(event) => this.changePassword(event)}
                        ></Form.Control>
                      </Col>
                    </Row>
                    <div className="px-3 py-3">
                      <Button
                        type="submit"
                        onClick={(event) => this.submitPassword(event)}
                      >
                        Update Changes
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
const mapDispatchtoProps = {
  getUserData,
  updateUserData,
  changeUserPassword,
  updateUserImage,
};

export default connect(mapStateToProps, mapDispatchtoProps)(EditProfile);
