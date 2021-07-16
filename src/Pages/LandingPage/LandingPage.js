import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../../redux/action/Movie";
import { Container, Row, Col, Card } from "react-bootstrap";
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
    this.props
      .getAllMovie(this.state.movie)
      .then((res) => {
        console.log(res);
        console.log(res.action.payload.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    console.log(userId);
    this.props.history.push(`edit-profile/${userId}`);
  };

  goToMovieDetail = (movieId) => {
    this.props.history.push(`/movie-detail/${movieId}`);
  };

  handleLogOut = () => {
    console.log("It's working man!");
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    console.log(this.props.auth.data);
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
                <img src={RightColImage} alt="" className="img-fluid"></img>
              </Col>
            </Row>
            <div>
              <div className="d-flex justify-content-between py-5">
                <span className="fw-bold">Upcoming Movies</span>
                <span>View All</span>
              </div>
              <Row className={style.upcomingMovieLists}>
                {getAllMovieData.map((element, a) => {
                  const movieId = element.movie_id;
                  return (
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <Card
                        onClick={() => this.goToMovieDetail(movieId)}
                        className={style.movieCard}
                      >
                        <span className="fw-bold text-center" key={a}>
                          {element.movie_name}
                        </span>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
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
