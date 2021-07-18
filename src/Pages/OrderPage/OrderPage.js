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
      premiereData: [],
      selectedSeat: [],
      reservedSeat: [],
    };
  }

  componentDidMount() {
    const id = this.props.match.params.movieId;
    console.log(this.props.match.params.movieId);
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        // console.log(res.data.data[0]);
        // console.log(res.data.pagination);
        this.setState({
          movieData: res.data.data[0],
        });
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

  render() {
    console.log(this.state.movieData);
    const { reservedSeat, selectedSeat } = this.state;
    console.log(this.state);
    const { movie_name } = this.state.movieData;
    return (
      <>
        <NavBar />
        <Container>
          <Row>
            <Col
              lg={7}
              md={7}
              className={`d-flex justify-content-between ${style.greyBackground} ${style.roundBorder} mb-3`}
            >
              <span className="fw-bold d-block">{movie_name}</span>
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
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default OrderPage;
