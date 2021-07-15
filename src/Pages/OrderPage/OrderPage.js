import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import style from "./OrderPage.module.css";
import axiosApiIntances from "../../Utils/axios";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieData: [], premiereData: [] };
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
  render() {
    console.log(this.state.movieData);
    const { movie_name } = this.state.movieData;
    return (
      <>
        <NavBar />
        <Container>
          <Row>
            <Col
              col={7}
              md={7}
              className={`d-flex justify-content-between ${style.greyBackground} ${style.roundBorder}`}
            >
              <span className="fw-bold d-block">{movie_name}</span>
              <Button>Change movie</Button>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default OrderPage;
