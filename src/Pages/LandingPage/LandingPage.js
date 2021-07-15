import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../../redux/action/Movie";
import { Container, Row, Col, Card } from "react-bootstrap";
import style from "./LandingPage.module.css";
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

  goToMovieDetail = (movieId) => {
    this.props.history.push(`/movie-detail/${movieId}`);
  };

  handleLogOut = () => {
    console.log("It's working man!");
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    console.log(this.props.auth.data);
    const getAllMovieData = this.props.movie.data;

    return (
      <>
        <div className="min-vh-100">
          <NavBar toHandleLogOut={this.handleLogOut.bind(this)} />
          <Container>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <h1>Landing Page!</h1>
              </Col>
            </Row>
            <div>
              <Row className={style.upcomingMovieLists}>
                {getAllMovieData.map((element, a) => {
                  const movieId = element.movie_id;
                  return (
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <Card onClick={() => this.goToMovieDetail(movieId)}>
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
