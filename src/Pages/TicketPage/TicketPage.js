import React, { Component } from "react";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./TicketPage.module.css";
import { connect } from "react-redux";
import axiosApiIntances from "../../Utils/axios";
import { Container, Row, Col } from "react-bootstrap";
import TickitzLogo from "../Components/tickitz_1.png";

class TicketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: {},
      bookingSeat: {},
      movie: {},
      count: "",
    };
  }

  componentDidMount() {
    this.getBookingData();
  }

  // GET BOOKING DATA
  getBookingData = () => {
    const bookingId = sessionStorage.getItem("bookingId");
    axiosApiIntances
      .get(`booking/bookingId/${bookingId}`)
      .then((res) => {
        console.log(res);
        this.setState({
          booking: res.data.data[0],
        });
        this.getMovieData(res.data.data[0].movie_id);
        this.getBookingSeatData(res.data.data[0].booking_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET MOVIE DATA
  getMovieData = (movieId) => {
    // console.log(`Movie id is ${movieId}`);
    axiosApiIntances
      .get(`movie/${movieId}`)
      .then((res) => {
        this.setState({
          movie: res.data.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //GET BOOKING SEAT DATA
  getBookingSeatData = (bookingId) => {
    // console.log(`Get booking seat data! = ${bookingId}`);
    axiosApiIntances
      .get(`booking/booking-seat-booking-id/${bookingId}`)
      .then((res) => {
        console.log(res);
        this.setState({
          bookingSeat: res.data.data[0],
        });
        this.countData(res.data.data[0].booking_seat_location);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  countData = (bookingSeatLocation) => {
    const bookingSeatLocationSplit = bookingSeatLocation.split(",");
    // console.log(bookingSeatLocationSplit);
    // console.log(bookingSeatLocationSplit.length);
    this.setState({
      count: bookingSeatLocationSplit.length,
    });
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    this.props.history.push(`/edit-profile/${userId}`);
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    console.log(this.state.booking);
    // console.log(this.state.movie);
    // console.log(`The length is... ${this.state.count}`);
    return (
      <>
        <NavBar
          toHandleLogOut={this.handleLogOut.bind(this)}
          toGoToEditProfile={this.goToEditProfile.bind(this)}
        />
        <Container fluid className={`${style.blueBackground} p-5`}>
          <div className={`${style.lighterBackground}`}>
            <h5 className="text-center py-4">Proof of Payment</h5>
            <div>
              <Container>
                <Row className={`${style.moreBlueBackground} mx-5`}>
                  <Row className={`mx-5`}>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <img
                        src={TickitzLogo}
                        alt=""
                        className={`img-fluid ${style.tickitzLogo}`}
                      ></img>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      className={style.leftCol}
                    >
                      <span>Admit One</span>
                    </Col>
                  </Row>
                </Row>
                <Row className={`mx-5`}>
                  <Row className="mx-5">
                    <Col className="pb-2">
                      <span className="d-block">Movie Title</span>
                      <span className="d-block fw-bold">
                        {this.state.movie.movie_name}
                      </span>
                    </Col>
                  </Row>
                </Row>
                <Row className={`mx-5`}>
                  <Row className={`mx-5`}>
                    <Col>
                      <span className="d-block">Count</span>
                      <span className="d-block fw-bold">
                        {this.state.count}
                        &nbsp;
                        {this.state.count > 1 ? (
                          <span>pieces</span>
                        ) : (
                          <span>piece</span>
                        )}
                      </span>
                    </Col>
                    <Col>
                      <span className="d-block">Seat Location</span>
                      <span className="d-block fw-bold">
                        {this.state.bookingSeat.booking_seat_location}
                      </span>
                    </Col>
                  </Row>
                </Row>
              </Container>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(TicketPage);
