import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "./OrderPage.module.css";
import { getMovieById } from "../../redux/action/Movie";
import { getBooking } from "../../redux/action/Booking";
import {
  getBookingSeat,
  postBookingSeat,
} from "../../redux/action/BookingSeat";
import { connect } from "react-redux";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Seat from "../Components/seat/seat";
import EbuIdLogo from "../Components/Vector.png";
import CineOne21Logo from "../Components/CineOne.png";
import hiflixCinemaLogo from "../Components/hiflix.png";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeat: [],
      movieData: [],
      reservedSeat: [],
      bookingId: "",
    };
  }

  componentDidMount() {
    sessionStorage.removeItem("bookingSeat");
    // console.log(this.props.match.params.bookingHour);
    const id = this.props.match.params.movieId;
    this.props
      .getMovieById(id)
      .then((res) => {
        console.log(res.value.data.data[0]);
        this.setState({
          movieData: res.value.data.data[0],
        });
        sessionStorage.setItem("movie", res.value.data.data[0].movie_name);
      })
      .catch((err) => {
        console.log(err);
      });
    // this.getLocation();
    this.getBookingData();
  }

  // getLocation = () => {
  //   // console.log("Get location works!");
  //   let locationId = sessionStorage.getItem("locationId");
  //   // console.log(`Get location works! \n${locationId}`);
  //   axiosApiIntances
  //     .get(`location/${locationId}`)
  //     .then((res) => {
  //       console.log(res.data.data[0]);
  //       sessionStorage.setItem("location", res.data.data[0].location_city);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  bookingSeat = (seat) => {
    this.setState({
      selectedSeat: [...this.state.selectedSeat, seat],
    });
  };

  removeSeat = (remove) => {
    // console.log(remove);
    this.setState({
      selectedSeat: this.state.selectedSeat.slice(0, remove),
    });
  };

  // CHECKOUT URUTAN SATU
  checkoutButton = () => {
    const priceData = sessionStorage.getItem("price");
    sessionStorage.setItem("bookingSeatLength", this.state.selectedSeat.length);
    sessionStorage.setItem("bookingSeat", this.state.selectedSeat);
    sessionStorage.setItem(
      "totalPayment",
      priceData * this.state.selectedSeat.length
    );
    this.checkoutData();
  };

  // CHECKOUT URUTAN DUA
  checkoutData = () => {
    const { user_id } = this.props.auth.data;
    let data = {
      userId: user_id,
      movieId: sessionStorage.getItem("movieId"),
      showTimeId: "",
      bookingTicket: sessionStorage.getItem("bookingSeatLength"),
      bookingTotalPrice: sessionStorage.getItem("totalPayment"),
    };
    console.log(data);
    // // console.log(this.props.auth.data);
    axiosApiIntances
      .post("/booking/booking", data)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("bookingId", res.data.data.id);
        this.postBooking(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // MENDAPATKAN DATA BOOKING BERDASARKAN MOVIE ID
  getBookingData = () => {
    // const { user_id } = this.props.auth.data;
    const movieId = sessionStorage.getItem("movieId");
    // console.log(user_id);
    // console.log(movieId);
    this.props
      .getBooking(movieId)
      .then((res) => {
        // console.log(res);
        this.getBookingSeat(res.value.data.data[0].movie_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // MENDAPATKAN DATA BOOKING SEAT
  getBookingSeat = (movieIdNumber) => {
    console.log(movieIdNumber);
    this.props
      .getBookingSeat(movieIdNumber)
      .then((res) => {
        // console.log(res);
        let resMap = res.value.data.data.map((a) => a.booking_seat_location);
        if (resMap.length > 1) {
          let joinResMap = resMap.join();
          let joinResMapSplit = joinResMap.split(",");
          this.setState({
            reservedSeat: joinResMapSplit,
          });
        } else if (resMap.length === 1) {
          this.setState({
            reservedSeat: resMap[0].split(","),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // CHECKOUT URUTAN TIGA
  postBooking = (bookingIdNumber) => {
    const data = {
      bookingId: bookingIdNumber,
      movieId: sessionStorage.getItem("movieId"),
      bookingSeatLocation: sessionStorage.getItem("bookingSeat"),
    };
    // console.log(data);
    // console.log(sessionStorage.getItem("bookingSeat"));
    this.props
      .postBookingSeat(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.goToPaymentPage();
  };

  // CHECKOUT URUTAN EMPAT
  goToPaymentPage = () => {
    this.props.history.push("/payment-page");
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    this.props.history.push(`/edit-profile/${userId}`);
  };

  goToLandingPage = () => {
    this.props.history.push("/");
  };

  goToMovieDetail = (movieId) => {
    this.props.history.push(`/movie-detail/${movieId}`);
  };

  handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  render() {
    // console.log(this.props);
    console.log(this.state.reservedSeat);
    console.log(this.state.selectedSeat);
    const premiereName = sessionStorage.getItem("premiere");
    const priceData = sessionStorage.getItem("price");
    const booking = sessionStorage.getItem("bookingHour");
    const { reservedSeat, selectedSeat } = this.state;
    const { movie_name } = this.state.movieData;
    return (
      <>
        <NavBar
          toHandleLogOut={this.handleLogOut.bind(this)}
          toGoToEditProfile={this.goToEditProfile.bind(this)}
        />
        <Container className="position-relative">
          <Row>
            <Col
              lg={7}
              md={7}
              className={`${style.greyBackground} ${style.roundBorder} ${style.leftCol} mb-3 p-3`}
            >
              <Row>
                <Col lg={6} md={6} sm={6} xs={6} className="my-auto">
                  <span className="fw-bold d-block my-auto">{movie_name}</span>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="my-auto">
                  <Button
                    className={`${style.changeMovieButton} ${style.rightButton} my-auto`}
                    onClick={() => this.goToLandingPage()}
                  >
                    Change Movie
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              lg={7}
              md={7}
              className={`${style.greyBackground} ${style.roundBorder} mb-3`}
            >
              <div className="p-3">
                <Seat
                  seatAlphabet="A"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="B"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="C"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="D"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="E"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="F"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="G"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                  removeSeat={this.removeSeat.bind(this)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={7} md={7} className={`${style.buttons}`}>
              <div className="d-flex justify-content-between">
                <Button
                  className={style.bottomPurpleButtonOutline}
                  onClick={() => this.goToLandingPage()}
                >
                  Change your movie
                </Button>
                <Button
                  onClick={() => this.checkoutButton()}
                  className={style.bottomPurpleButton}
                >
                  Checkout Now
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              lg={4}
              md={4}
              className={`${style.greyBackground} ${style.roundBorder} ${style.orderInfoBox}`}
            >
              {premiereName === "ebu.id" ? (
                <img
                  src={EbuIdLogo}
                  alt=""
                  className={`img-fluid ${style.premiereLogo} py-4`}
                ></img>
              ) : premiereName === "CineOne21" ? (
                <img
                  src={CineOne21Logo}
                  alt=""
                  className={`img-fluid ${style.premiereLogo} py-4`}
                ></img>
              ) : premiereName === "hiflix Cinema" ? (
                <img
                  src={hiflixCinemaLogo}
                  alt=""
                  className={`img-fluid ${style.premiereLogo} py-4`}
                ></img>
              ) : null}
              <h2 className="fw-bold text-center py-3">{movie_name}</h2>
              <Row className="d-flex justify-content-between pb-2">
                <Col lg={6} md={6} sm={6} xs={6} className="my-auto">
                  Movie Selected
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className=" my-auto text-end fw-bold"
                >
                  {movie_name}
                </Col>
              </Row>
              <div className="d-flex justify-content-between pb-2">
                <span>Date_Unknown</span>
                <span className="fw-bold">{booking}</span>
              </div>
              <div className="d-flex justify-content-between pb-2">
                <span>One Ticket Price</span>
                <span className="fw-bold">{priceData}</span>
              </div>
              <div className="d-flex justify-content-between pb-4">
                <span>Seat Selected</span>
                {this.state.selectedSeat.length <= 0 && (
                  <span className="fw-bold">Choose a seat</span>
                )}
                {this.state.selectedSeat.length > 0 && (
                  <span className="fw-bold">{this.state.selectedSeat}</span>
                )}
              </div>
              <hr></hr>
              <div className="d-flex justify-content-between py-4">
                <h5>Total Payment</h5>
                {this.state.selectedSeat.length <= 0 && (
                  <span className="fw-bold">{priceData}</span>
                )}
                {this.state.selectedSeat.length > 0 && (
                  <span className="fw-bold">
                    {priceData * this.state.selectedSeat.length}
                  </span>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchtoProps = {
  getMovieById,
  getBooking,
  getBookingSeat,
  postBookingSeat,
};
export default connect(mapStateToProps, mapDispatchtoProps)(OrderPage);
