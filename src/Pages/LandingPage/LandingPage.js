import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../../redux/action/Movie";
import { Container, Row, Col, Card } from "react-bootstrap";
import style from "./LandingPage.module.css";

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

  render() {
    console.log(this.props.auth.data);
    const getAllMovieData = this.props.movie.data;

    return (
      <>
        <Container fluid>
          <h1>Landing Page!</h1>
          <div className="position-relative">
            <Row className={style.upcomingMovieLists}>
              {getAllMovieData.map((element, a) => {
                return (
                  <Col lg={2} md={2} sm={2} xs={2}>
                    <Card>
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
