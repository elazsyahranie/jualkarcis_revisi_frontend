import React, { Component } from "react";
import { getMovieById } from "../../redux/action/Movie";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import style from "./MovieDetail.module.css";
import EbuIdLogo from "../Components/Vector.png";
import CineOne21Logo from "../Components/CineOne.png";
import hiflixCinemaLogo from "../Components/hiflix.png";
// import session from "redux-persist/lib/storage/session";
// import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      premiereData: [],
      bookingData: { bookingHour: "", bookingPremiere: "" },
    };
  }
  componentDidMount() {
    sessionStorage.clear();
    const { id } = this.props.match.params;
    console.log(id);
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        console.log(res.data.data[0].movie_id);
        // console.log(res.data.pagination);
        this.setState({
          movieData: res.data.data[0],
          premiereData: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPremiere = (event) => {
    const { id } = this.props.match.params;
    console.log(`Get premiere! - ${event.target.value}`);
    axiosApiIntances
      .get(`premiere/${id}/${event.target.value}`)
      .then((res) => {
        // console.log(res.data.data);
        this.setState({
          premiereData: res.data.data,
        });
        // console.log(this.state.premiereData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    // console.log(this.props.history);
    this.props.history.push(`/edit-profile/${userId}`);
  };

  bookingHour = (hour) => {
    console.log(hour);
    sessionStorage.setItem("bookingHour", hour);
    // this.setState({
    //   bookingData: { bookingHour: hour },
    // });
  };

  bookingPremiere = (premiere, price) => {
    console.log(premiere);
    console.log(price);
    // sessionStorage.setItem("premiere", premiere);
    // sessionStorage.setItem("price", price);
    // this.goToOrderPage();
  };

  goToOrderPage = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/order-page/${id}`);
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  // };

  render() {
    // console.log(this.props.auth.data);
    // console.log(this.state.bookingData);
    const premiere = this.state.premiereData;
    console.log(premiere);
    const {
      movie_name,
      movie_casts,
      movie_genre,
      movie_image,
      movie_release_date,
      movie_duration,
      movie_directed_by,
      movie_synopsis,
    } = this.state.movieData;
    return (
      <>
        <NavBar
          toHandleLogOut={this.handleLogOut.bind(this)}
          toGoToEditProfile={this.goToEditProfile.bind(this)}
        />
        <Container className="py-5">
          <Row>
            <Col
              lg={4}
              md={4}
              sm={12}
              xs={12}
              className={style.fluidWhiteBackground}
            >
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}${movie_image}`}
                alt=""
                className="img-fluid"
              ></img>
            </Col>
            <Col lg={7} md={7} sm={12} xs={12}>
              <h2>{movie_name}</h2>
              <span className="d-block">{movie_genre}</span>
              <Row className="mt-4">
                <Col lg={6} md={6} sm={6} xs={6}>
                  <div className="mb-2">
                    <span className="fw-bold d-block">Movie Duration</span>
                    <span className="d-block">{movie_duration}</span>
                  </div>
                  <div className="mt-2">
                    <span className="fw-bold d-block">Movie Release Date</span>
                    <span className="d-block">{movie_release_date}</span>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                  <div className="mb-2">
                    <span className="fw-bold d-block">Movie Directed By</span>
                    <span className="d-block">{movie_directed_by}</span>
                  </div>
                  <div className="mt-2">
                    <span className="fw-bold d-block">Movie Casts</span>
                    <span className="d-block">{movie_casts}</span>
                  </div>
                </Col>
                <div>
                  <hr></hr>
                  <div className="mb-3">
                    <h5>Synopsis</h5>
                    <p>{movie_synopsis}</p>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className={style.greyBackground}>
          <Container>
            <h5 className="fw-bold text-center py-4">Showtimes and Tickets</h5>
            <div className="d-flex justify-content-center mb-4">
              <input
                type="date"
                id="start"
                name="trip-start"
                value="2018-07-22"
              ></input>
              <select onChange={this.getPremiere}>
                <option selected disabled hidden>
                  Select your option
                </option>
                <option value="1">Jakarta</option>
                <option value="2">Bandung</option>
                <option value="3">Jogjakarta</option>
                <option value="4">Surabaya</option>
              </select>
            </div>
            <Row className="mt-2 pb-5">
              {premiere === null ||
              premiere === "" ||
              premiere === undefined ? (
                <span>Please choose a city!</span>
              ) : (
                premiere.map((element, a) => {
                  console.log(element);
                  const premiereId = element.premiere_id;
                  return (
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <Card>
                        <div className="d-flex w-100 px-2">
                          <div className="w-50 my-auto">
                            {element.premiere_name === "ebu.id" ? (
                              <img
                                src={EbuIdLogo}
                                alt=""
                                className="img-fluid"
                              ></img>
                            ) : element.premiere_name === "CineOne21" ? (
                              <img
                                src={CineOne21Logo}
                                alt=""
                                className="img-fluid"
                              ></img>
                            ) : element.premiere_name === "hiflix Cinema" ? (
                              <img
                                src={hiflixCinemaLogo}
                                alt=""
                                className="img-fluid"
                              ></img>
                            ) : null}
                          </div>
                          <Row className={`mx-2 ${style.premiereData}`}>
                            <h5 idCinema="ebuId">{element.premiere_name}</h5>
                            <span
                              className={`${style.addressStyle} ${style.greyText}`}
                            >
                              Whatever street No.12, South Purwokerto
                            </span>
                          </Row>
                        </div>
                        <hr></hr>
                        <div className={`${style.cardCinemaHours} px-3`}>
                          <span
                            id="hourOne"
                            onClick={() => this.bookingHour("08:30am")}
                            className="pe-3"
                          >
                            08:30am
                          </span>
                          <span
                            id="hourTwo"
                            onClick={() => this.bookingHour("10:30am")}
                            className="pe-3"
                          >
                            10:30am
                          </span>
                          <span
                            id="hourThree"
                            onClick={() => this.bookingHour("12:30am")}
                            className="pe-3"
                          >
                            12:00am
                          </span>
                          <span
                            id="hourFour"
                            onClick={() => this.bookingHour("02:30pm")}
                            className="pe-3"
                          >
                            02:00pm
                          </span>
                          <span
                            id="hourFive"
                            onClick={() => this.bookingHour("04:30pm")}
                            className="pe-3"
                          >
                            04:30pm
                          </span>
                          <span
                            id="hourSix"
                            onClick={() => this.bookingHour("07:30pm")}
                            className="pe-3"
                          >
                            07:00pm
                          </span>
                          <span
                            id="hourSeven"
                            onClick={(id) => this.bookingHour("08:30pm")}
                            className="pe-3"
                          >
                            08:30pm
                          </span>
                        </div>
                        <div className="p-3">
                          <Button
                            onClick={() =>
                              this.bookingPremiere(element.premiere_name, 10)
                            }
                            className={`w-100 ${style.bookingNowButton}`}
                          >
                            Book Now
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
                })
              )}

              {/* {premiere.map((element, a) => {
                  const premiereId = element.movie_id;
                  return (
                    <Card onClick={() => this.goToMovieDetail(premiereId)}>
                      <span className="fw-bold text-center" key={a}>
                        {element.premiere_name}
                      </span>
                    </Card>
                  );
                })} */}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});
const mapDispatchToProps = { getMovieById };

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
