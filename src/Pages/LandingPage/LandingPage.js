import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../../redux/action/Movie";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import style from "./LandingPage.module.css";
import RightColImage from "../Components/home_image/Group_14.png";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      movie: [],
    };
  }

  componentDidMount() {
    this.props.getAllMovie(this.state.movie);
  }

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    // console.log(userId);
    this.props.history.push(`/edit-profile/${userId}`);
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
    const getAllMovieData = this.props.movie.data;

    return (
      <>
        <div className="min-vh-100">
          <NavBar
            toHandleLogOut={this.handleLogOut.bind(this)}
            toGoToEditProfile={this.goToEditProfile.bind(this)}
          />
          <Container>
            <Row className="py-5">
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className={`${style.leftColTexts} ${style.purpleText}`}>
                  <h6>Nearest Cinema, Newest Movie,</h6>
                  <h1>Find out now!</h1>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <img
                  src={RightColImage}
                  alt=""
                  className={`img-fluid ${style.rightColImageClass}`}
                ></img>
              </Col>
            </Row>
            <div>
              <div className="d-flex justify-content-between py-5">
                <span className="fw-bold">Upcoming Movies</span>
                <span>View All</span>
              </div>
              {/* <div className={style.monthsList}>
                <Button className={style.monthButton}>September</Button>
                <Button className={style.monthButton}>October</Button>
                <Button className={style.monthButton}>November</Button>
                <Button className={style.monthButton}>December</Button>
                <Button className={style.monthButton}>January</Button>
                <Button className={style.monthButton}>February</Button>
                <Button className={style.monthButton}>March</Button>
                <Button className={style.monthButton}>April</Button>
                <Button className={style.monthButton}>May</Button>
                <Button className={style.monthButton}>June</Button>
                <Button className={style.monthButton}>July</Button>
                <Button className={style.monthButton}>August</Button>
              </div> */}
              <div className={`${style.upcomingMovieLists} my-5`}>
                <div className={style.box}>
                  {getAllMovieData.map((element, a) => {
                    const movieId = element.movie_id;
                    return (
                      <Card
                        onClick={() => this.goToMovieDetail(movieId)}
                        className={style.movieCard}
                      >
                        <span className="fw-bold text-center" key={a}>
                          {element.movie_name}
                        </span>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <div className={`${style.moviegoerVanguard} mb-5`}>
                <div className="pt-4 mb-5">
                  <span className={`d-block text-center ${style.purpleText}`}>
                    Be the vanguard of
                  </span>
                  <h2 className={`text-center ${style.purpleText}`}>
                    Moviegoers
                  </h2>
                </div>
                <div className={`${style.moviegoerForm} pb-5`}>
                  <input
                    className={`${style.myFormControl} ${style.moviegoerEmail}`}
                    type="email"
                    placeholder="Type your email"
                  ></input>
                  <Button type="submit" className={style.moviegoerButton}>
                    Join Now
                  </Button>
                </div>
                <div className={`${style.moviegoerLast} pb-4`}>
                  <span className="d-block text-center">
                    By joining you as a Tickitz member,
                  </span>
                  <span className="d-block text-center">
                    we will always send you the latest updates via email
                  </span>
                </div>
              </div>
            </div>
          </Container>
          <Footer className={style.footerLandingCss} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});
const mapDispatchtoProps = { getAllMovie };

export default connect(mapStateToProps, mapDispatchtoProps)(LandingPage);
