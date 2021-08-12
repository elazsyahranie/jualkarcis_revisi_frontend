import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieById, postMovie } from "../../redux/action/Movie";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./PostMovie.module.css";
import NoImageAvailable from "../Components/image-not-available.png";

class PostMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {
        movieName: "",
        movieGenre: "",
        movieDuration: "",
        movieImage: "",
        movieDirector: "",
        movieCasts: "",
        movieReleaseDate: "",
        movieSynopsis: "",
      },
    };
  }

  changeText = (event) => {
    this.setState({
      movieData: {
        ...this.state.movieData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleImage = (event) => {
    this.setState({
      movieData: {
        ...this.state.movieData,
        movieImage: event.target.files[0],
      },
    });
  };

  postData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("movieName", this.state.movieData.movieName);
    formData.append("movieGenre", this.state.movieData.movieGenre);
    formData.append("movieDuration", this.state.movieData.movieDuration);
    formData.append("image", this.state.movieData.movieImage);
    formData.append("movieDirector", this.state.movieData.movieDirector);
    formData.append("movieCasts", this.state.movieData.movieCasts);
    formData.append("movieSynopsis", this.state.movieData.movieSynopsis);
    this.props
      .postMovie(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state.movieData.movieImage);
    const { user_role } = this.props.auth.data;
    if (user_role === "Customer") {
      this.props.history.push("/");
    }
    const {
      movieName,
      movieGenre,
      movieDirector,
      movieCasts,
      movieReleaseDate,
      movieDuration,
      movieSynopsis,
      movieImage,
    } = this.state.movieData;
    return (
      <>
        <NavBar />
        <div className={style.greyBackground}>
          <Container>
            <h5 className="pt-5">Form Movie</h5>
            <Form>
              <Row className={`${style.whiteBox} p-3`}>
                <Col lg={3} md={3} sm={12} xs={12}>
                  <Form.Group className={`${style.formGroupUploadImage}`}>
                    <div className="position-relative">
                      {movieImage === null ||
                      movieImage === "" ||
                      movieImage === undefined ? (
                        <Image
                          src={NoImageAvailable}
                          className={style.imgMovie}
                        />
                      ) : (
                        <Image
                          src={`${URL.createObjectURL(
                            this.state.movieData.movieImage
                          )}`}
                          className={style.imgMovie}
                        />
                      )}
                      <Form.Label
                        htmlFor="files"
                        className={style.boxUpdateImage}
                      >
                        Jangan di hapus!
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="files"
                        onChange={(event) => this.handleImage(event)}
                        className={style.updateImage}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                  <div className="pb-2">
                    <Form.Label>Movie Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Movie Name"
                      name="movieName"
                      value={movieName}
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                  <div className="pb-2">
                    <Form.Label>Director</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Director"
                      name="movieDirector"
                      value={movieDirector}
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Release Date"
                    name="movieReleaseDate"
                    value={movieReleaseDate}
                    onChange={(event) => this.changeText(event)}
                  />
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                  <div className="pb-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Category"
                      name="movieGenre"
                      value={movieGenre}
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                  <div className="pb-2">
                    <Form.Label>Casts</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Casts"
                      name="movieCasts"
                      value={movieCasts}
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                  <div>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Movie Name"
                      name="movieDuration"
                      value={movieDuration}
                      onChange={(event) => this.changeText(event)}
                    />
                  </div>
                </Col>
                <div className="pt-3 pb-3">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Movie Synopsis"
                    name="movieSynopsis"
                    value={movieSynopsis}
                    onChange={(event) => this.changeText(event)}
                  />
                </div>
                <div className={style.formButtons}>
                  <Button
                    type="submit"
                    className={style.purpleButtonReset}
                    onClick={(event) => this.postData(event)}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className={style.purpleButtonSubmit}
                    onClick={(event) => this.postData(event)}
                  >
                    Submit
                  </Button>
                </div>
              </Row>
            </Form>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});
const mapDispatchToProps = { getMovieById, postMovie };

export default connect(mapStateToProps, mapDispatchToProps)(PostMovie);

// export default PostMovie;
