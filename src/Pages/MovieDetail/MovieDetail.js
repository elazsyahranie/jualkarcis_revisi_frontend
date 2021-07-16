import React, { Component } from "react";
import { getMovieById } from "../../redux/action/Movie";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import style from "./MovieDetail.module.css";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { movieData: [], premiereData: [] };
  }
  componentDidMount() {
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

  goToOrderPage = (event) => {
    const movieId = this.props.match.params.id;
    // console.log(this.state.movieData);
    this.props.history.push(`/order-page/${movieId}`);
  };

  // };

  render() {
    console.log(this.state);
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
        <NavBar />
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
            <Row>
              <Card></Card>
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
