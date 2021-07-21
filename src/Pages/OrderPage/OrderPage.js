import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import style from "./OrderPage.module.css";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Seat from "../Components/seat/seat";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      premiereData: {
        movie: "",
        location: "",
        premiereName: "",
        premierePrice: "",
      },
      selectedSeat: [],
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
    this.postPremiere();
  }

  postPremiere = () => {
    const id = this.props.match.params.movieId;
    const premiereName = sessionStorage.getItem("premiere");
    const priceData = parseInt(sessionStorage.getItem("price"));
    const booking = parseInt(sessionStorage.getItem("bookingHour"));
    const data = {
      movie: id,
      location: 3,
      premiereName: premiereName,
      premierePrice: priceData,
    };
    console.log(data);
    axiosApiIntances
      .post("premiere/", { ...data })
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("premiereId", res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  bookingSeat = (seat) => {
    this.setState({
      selectedSeat: [...this.state.selectedSeat, seat],
    });
  };

  checkoutNow = () => {
    console.log(this.state.selectedSeat);
    console.log("Checkout button!");
    sessionStorage.setItem("bookingSeat", this.state.selectedSeat);
    this.props.history.push("/payment-page");
  };

  render() {
    // const theSelectedSeat = this.state.selectedSeat;
    // theSelectedSeat.forEach(function(e) {

    // })
    // console.log(this.state.selectedSeat);
    const premiereName = sessionStorage.getItem("premiere");
    const priceData = sessionStorage.getItem("price");
    const booking = sessionStorage.getItem("bookingHour");
    // console.log(this.state.selectedSeat.length);
    const { reservedSeat, selectedSeat } = this.state;
    // const premiereName = this.props.match.params.premiereName;
    const { movie_name } = this.state.movieData;
    return (
      <>
        <NavBar />
        <Container className="position-relative">
          <Row>
            <Col
              lg={7}
              md={7}
              className={`d-flex justify-content-between ${style.greyBackground} ${style.roundBorder} ${style.leftCol} mb-3 p-3`}
            >
              <span className="fw-bold d-block my-auto">{movie_name}</span>
              <Button>Change movie</Button>
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
                <Button>Change your movie</Button>
                <Button onClick={() => this.checkoutNow()}>Checkout Now</Button>
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
                <span className="fw-bold">{this.state.selectedSeat}</span>
              </div>
              <hr></hr>
              <div className="d-flex justify-content-between py-4">
                <h5>Total Payment</h5>
                <span className="fw-bold">Unknown</span>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default OrderPage;
