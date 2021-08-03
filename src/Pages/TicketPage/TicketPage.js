import React, { Component } from "react";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./TicketPage.module.css";
import axiosApiIntances from "../../Utils/axios";
import { Container, Row, Col } from "react-bootstrap";
import TickitzLogo from "../Components/Tickitz_2.png";

class TicketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: {},
      movie: {},
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
        // console.log(res);
        this.setState({
          booking: res.data.data[0],
        });
        this.getMovieData(res.data.data[0].movie_id);
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
    console.log(this.state.movie);
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
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <img src={TickitzLogo} alt="" className="img-fluid"></img>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <span>Admit One</span>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

export default TicketPage;
