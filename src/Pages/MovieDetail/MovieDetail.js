import React, { Component } from "react";
import { getMovieById } from "../../redux/action/Movie";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import style from "./MovieDetail.module.css";
import session from "redux-persist/lib/storage/session";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      premiereData: {
        movie: "",
        location: 3,
        premiereName: "",
        premierePrice: "",
      },
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
        console.log(res.data.pagination);
        this.setState({
          movieData: res.data.data[0],
          premiereData: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    sessionStorage.setItem("premiere", premiere);
    sessionStorage.setItem("price", price);
    this.goToOrderPage();
  };

  goToOrderPage = () => {
    const movieid = parseInt(this.props.match.params.id);
    const premiereSession = sessionStorage.getItem("premiere");
    const bookingSession = sessionStorage.getItem("bookingHour");
    const priceSession = parseInt(sessionStorage.getItem("price"));
    this.setState({
      premiereData: {
        movie: movieid,
        location: 3,
        premiereName: premiereSession,
        premierePrice: priceSession,
      },
    });
    console.log(movieid);
    axiosApiIntances
      .post("premiere/", { ...this.state.premiereData })
      .then((res) => {
        console.log(res);
        const premiereId = res.data.data.id;
        console.log(premiereId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  // };

  render() {
    // console.log(this.state);
    console.log(this.state.bookingData);
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
              <Button onClick={(event) => this.goToOrderPage(event)}>
                Go To Payment Page
              </Button>
            </Col>
          </Row>
        </Container>
        <div className={style.greyBackground}>
          <Container>
            <h5 className="fw-bold text-center py-4">Showtimes and Tickets</h5>
            <div className="d-flex justify-content-center">
              <input
                type="date"
                id="start"
                name="trip-start"
                value="2018-07-22"
              ></input>
            </div>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <Card>
                  <h3 idCinema="ebuId">ebu.id</h3>
                  <span>Whatever street No.12, South Purwokerto</span>
                  <hr></hr>
                  <p className={style.cardCinemaHours}>
                    <span
                      id="hourOne"
                      onClick={() => this.bookingHour("08:30am")}
                    >
                      08:30am
                    </span>
                    <span
                      id="hourTwo"
                      onClick={() => this.bookingHour("10:30am")}
                    >
                      10:30am
                    </span>
                    <span
                      id="hourThree"
                      onClick={() => this.bookingHour("12:30am")}
                    >
                      12:00am
                    </span>
                    <span
                      id="hourFour"
                      onClick={() => this.bookingHour("02:30pm")}
                    >
                      02:00pm
                    </span>
                    <span
                      id="hourFive"
                      onClick={() => this.bookingHour("04:30pm")}
                    >
                      04:30pm
                    </span>
                    <span
                      id="hourSix"
                      onClick={() => this.bookingHour("07:30pm")}
                    >
                      07:00pm
                    </span>
                    <span
                      id="hourSeven"
                      onClick={(id) => this.bookingHour("08:30pm")}
                    >
                      08:30pm
                    </span>
                  </p>
                  <Button onClick={() => this.bookingPremiere("ebu.id", 10)}>
                    Book Now
                  </Button>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={3} xs={3}>
                <Card>
                  <h3 id="CineOne21">CineOne21</h3>
                  <span>Whatever street No.12, South Purwokerto</span>
                  <hr></hr>
                  <p className={style.cardCinemaHours}>
                    <span
                      id="hourOne"
                      onClick={() => this.bookingHour("08:30am")}
                    >
                      08:30am
                    </span>
                    <span
                      id="hourTwo"
                      onClick={() => this.bookingHour("10:30am")}
                    >
                      10:30am
                    </span>
                    <span
                      id="hourThree"
                      onClick={() => this.bookingHour("12:30am")}
                    >
                      12:00am
                    </span>
                    <span
                      id="hourFour"
                      onClick={() => this.bookingHour("02:30pm")}
                    >
                      02:00pm
                    </span>
                    <span
                      id="hourFive"
                      onClick={() => this.bookingHour("04:30pm")}
                    >
                      04:30pm
                    </span>
                    <span
                      id="hourSix"
                      onClick={() => this.bookingHour("07:30pm")}
                    >
                      07:00pm
                    </span>
                    <span
                      id="hourSeven"
                      onClick={(id) => this.bookingHour("08:30pm")}
                    >
                      08:30pm
                    </span>
                  </p>
                  <Button
                    name="CineOne 21"
                    onClick={() => this.bookingPremiere("CineOne 21", 10)}
                  >
                    Book Now
                  </Button>
                </Card>
              </Col>
              <Col lg={3} md={3} sm={3} xs={3}>
                <Card>
                  <h3 id="hiflixCinema">hiflixCinema</h3>
                  <span>Whatever street No.12, South Purwokerto</span>
                  <hr></hr>
                  <p className={style.cardCinemaHours}>
                    <span
                      id="hourOne"
                      onClick={() => this.bookingHour("08:30am")}
                    >
                      08:30am
                    </span>
                    <span
                      id="hourTwo"
                      onClick={() => this.bookingHour("10:30am")}
                    >
                      10:30am
                    </span>
                    <span
                      id="hourThree"
                      onClick={() => this.bookingHour("12:30am")}
                    >
                      12:00am
                    </span>
                    <span
                      id="hourFour"
                      onClick={() => this.bookingHour("02:30pm")}
                    >
                      02:00pm
                    </span>
                    <span
                      id="hourFive"
                      onClick={() => this.bookingHour("04:30pm")}
                    >
                      04:30pm
                    </span>
                    <span
                      id="hourSix"
                      onClick={() => this.bookingHour("07:30pm")}
                    >
                      07:00pm
                    </span>
                    <span
                      id="hourSeven"
                      onClick={(id) => this.bookingHour("08:30pm")}
                    >
                      08:30pm
                    </span>
                  </p>
                  <Button
                    name="hiflix Cinema"
                    onClick={() => this.bookingPremiere("hiflix Cinema", 10)}
                  >
                    Book Now
                  </Button>
                </Card>
              </Col>
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
