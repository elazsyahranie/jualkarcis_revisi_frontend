import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../../redux/action/Movie";
import { Row, Col, Card } from "react-bootstrap";

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
        <h1>Landing Page!</h1>
        <Row>
          {getAllMovieData.map((element, a) => {
            return (
              <ul>
                <li key={a}>{element.movie_name}</li>
              </ul>
            );
          })}
        </Row>
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
