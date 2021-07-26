import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "./OrderPage.module.css";
import { connect } from "react-redux";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Seat from "../Components/seat/seat";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeat: [],
      movieData: [],
      reservedSeat: [],
    };
  }

  componentDidMount() {
    sessionStorage.removeItem("bookingSeat");
    // console.log(this.props.match.params.bookingHour);
    const id = this.props.match.params.movieId;
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        // console.log(res.data.pagination);
        this.setState({
          movieData: res.data.data[0],
        });
        sessionStorage.setItem("movie", res.data.data[0].movie_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  bookingSeat = (seat) => {
    this.setState({
      selectedSeat: [...this.state.selectedSeat, seat],
    });
  };

  checkoutNow = () => {
    const priceData = sessionStorage.getItem("price");
    sessionStorage.setItem("bookingSeatLength", this.state.selectedSeat.length);
    sessionStorage.setItem("bookingSeat", this.state.selectedSeat);
    sessionStorage.setItem(
      "totalPayment",
      priceData * this.state.selectedSeat.length
    );
    this.props.history.push("/payment-page");
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    // console.log(userId);
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
    this.props.history.push("/");
  };

  render() {
    // console.log(this.props.auth.data);
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
              className={`d-flex justify-content-between ${style.greyBackground} ${style.roundBorder} ${style.leftCol} mb-3 p-3`}
            >
              <span className="fw-bold d-block my-auto">{movie_name}</span>
              <Button
                className={style.changeMovieButton}
                onClick={() => this.goToLandingPage()}
              >
                Change Movie
              </Button>
            </Col>
          </Row>
          <Row>
            <Col
              lg={7}
              md={7}
              className={`${style.greyBackground} ${style.roundBorder}`}
            >
              <div className="p-3">
                <span className="d-block">Booking Seat</span>
                <Seat
                  seatAlphabet="A"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="B"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="C"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="D"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="E"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="F"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
                <Seat
                  seatAlphabet="G"
                  reserved={reservedSeat}
                  selected={selectedSeat}
                  bookingSeat={this.bookingSeat.bind(this)}
                />
              </div>
              <div className="d-flex justify-content-between">
                <Button
                  className={style.bottomPurpleButton}
                  onClick={() => this.goToLandingPage()}
                >
                  Change your movie
                </Button>
                <Button
                  onClick={() => this.checkoutNow()}
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
              <h3 className="text-center pb-4">{premiereName}</h3>
              <div className="d-flex justify-content-between pb-2">
                <span>Movie Selected</span>
                <span className="fw-bold">{movie_name}</span>
              </div>
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

export default connect(mapStateToProps, null)(OrderPage);
