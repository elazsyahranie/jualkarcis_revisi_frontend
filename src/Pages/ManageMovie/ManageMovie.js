import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieById } from "../../redux/action/Movie";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./ManageMovie.module.css";
import axiosApiIntances from "../../Utils/axios";
import NoMovieImage from "../Components/olga-thelavart-unsplash.jpg";

class PostMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {
        movieName: "",
        movieGenre: "",
        movieDuration: "",
        movieImage: "",
        movieCasts: "",
        movieDirector: "",
        movieSynopsis: "",
      },
    };
  }

  componentDidMount() {
    this.getMovieData();
  }

  getMovieData = () => {
    const { movieId } = this.props.match.params;
    console.log(this.props.match.params);
    this.props
      .getMovieById(movieId)
      .then((res) => {
        this.setState({
          movieData: {
            ...this.state.movieData,
            movieName: this.props.movie.data[0].movie_name,
            movieGenre: this.props.movie.data[0].movie_genre,
            movieDuration: this.props.movie.data[0].movie_duration,
            movieImage: this.props.movie.data[0].movie_image,
            movieCasts: this.props.movie.data[0].movie_casts,
            movieDirector: this.props.movie.data[0].movie_directed_by,
            movieSynopsis: this.props.movie.data[0].movie_synopsis,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeText = (event) => {
    this.setState({
      movieData: {
        ...this.state.movieData,
        [event.target.name]: event.target.value,
      },
    });
  };

  updateData = (event) => {
    event.preventDefault();
    const { movieId } = this.props.match.params;
    axiosApiIntances
      .patch(`movie/${movieId}`, { ...this.state.movieData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleImage = (event) => {
    this.setState(
      {
        movieData: {
          ...this.state.movieData,
          movieImage: event.target.files[0],
        },
      },
      () => this.updateImage()
    );
  };

  updateImage = () => {
    const { movieId } = this.props.match.params;
    const fd = new FormData();
    fd.append("image", this.state.movieData.movieImage);
    axiosApiIntances
      .patch(`movie/update-movie-image/${movieId}`, fd)
      .then((res) => {
        console.log(res);
        this.getMovieData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.props.movie.data[0].movie_image);
    const { user_role } = this.props.auth.data;
    // const { movie_image } = this.props.movie.data[0];
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
                  <Form.Group className={style.formGroupUploadImage}>
                    <div className="position-relative">
                      {movieImage === null ||
                      movieImage === undefined ||
                      movieImage === "" ? (
                        <Image src={NoMovieImage} className="img-fluid"></Image>
                      ) : (
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_URL}${this.props.movie.data[0].movie_image}`}
                          className="img-fluid"
                        ></Image>
                      )}
                      <Form.Label
                        htmlFor="files"
                        className={style.boxUpdateImage}
                      >
                        Jangan di hapus !
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="files"
                        onChange={(event) => this.handleImage(event)}
                        className={style.updateImage}
                      />
                    </div>
                  </Form.Group>

                  {/* <Form.Group className={style.formGroupUploadImage}>
                      <div className="position-relative">
                        {userImage === null ||
                        userImage === "" ||
                        userImage === undefined ? (
                          <Image
                            src={imgNotFound}
                            className={style.imgProfile}
                          />
                        ) : (
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_URL}${user_profile_picture}`}
                            className={style.imgProfile}
                          />
                        )}
                        <Form.Label
                          htmlFor="files"
                          className={style.boxUpdateImage}
                        >
                          Jangan di hapus !
                        </Form.Label>
                        <Form.Control
                          type="file"
                          id="files"
                          onChange={(event) => this.handleImage(event)}
                          className={style.updateImage}
                        />
                      </div>
                    </Form.Group> */}
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
                    onClick={(event) => this.updateData(event)}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className={style.purpleButtonSubmit}
                    onClick={(event) => this.updateData(event)}
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
const mapDispatchToProps = { getMovieById };

export default connect(mapStateToProps, mapDispatchToProps)(PostMovie);

// export default PostMovie;
