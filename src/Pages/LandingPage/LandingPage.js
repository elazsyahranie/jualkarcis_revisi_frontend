import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie, getAllMovieByPagination } from "../../redux/action/Movie";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import style from "./LandingPage.module.css";
import RightColImage from "../Components/home_image/Group_14.png";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ReactPaginate from "react-paginate";
import axiosApiIntances from "../../Utils/axios";
import Router from "react-router-dom";
import qs from "query-string";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    let urlParams = qs.parse(this.props.location.search);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      movie: [],
      data: [],
      pagination: {},
      totalPage: 3,
      page: urlParams.page ? urlParams.page : 1,
      sort: urlParams.sort ? urlParams.sort : "",
      search: urlParams.search ? urlParams.search : "",
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getMoviebyPagination();
  }

  pageId = (event) => {
    const selectedPage = event.selected + 1;
    console.log(selectedPage);
    this.setState({ page: selectedPage }, () => {
      this.getMoviebyPagination();
    });
  };

  sort = (sortBy) => {
    this.setState({ sort: sortBy }, () => {
      this.getMoviebyPagination();
    });
    this.getMoviebyPagination();
  };

  getMoviebyPagination = () => {
    this.setState({ isLoading: true });
    this.props
      .getAllMovieByPagination(
        this.state.page,
        this.state.sort,
        this.state.search
      )
      .then((res) => {
        // console.log(res);
        this.setState({
          movie: res.value.data.data,
          pagination: res.value.data.pagination,
          isLoading: false,
        });
        this.props.history.push(
          `/landing-page?page=${this.state.page}sort=${this.state.sort}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSearchMovie = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  clickSearchMovie = () => {
    this.getMoviebyPagination();
  };

  goToEditProfile = () => {
    const userId = this.props.auth.data.user_id;
    this.props.history.push(`/edit-profile/${userId}`);
  };

  goToMovieDetail = (movieId) => {
    this.props.history.push(`/movie-detail/${movieId}`);
  };

  goToManageMovie = (movieId) => {
    this.props.history.push(`/manage-movie/${movieId}`);
  };

  handleDeleteMovie = (movieId) => {
    axiosApiIntances.delete(`movie/${movieId}`);
    window.setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
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
              <div className="d-flex justify-content-between pt-5">
                <span className="fw-bold">Upcoming Movies</span>
                <span>View All</span>
              </div>
              <Row className={`${style.upcomingMovieLists} mt-3`}>
                <div className="mb-3">
                  <Form>
                    <Form.Group className={`py-3 ${style.searchForm}`}>
                      <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search movie..."
                        className={style.searchInput}
                        onChange={(event) => this.handleSearchMovie(event)}
                      />
                      <Button onClick={(event) => this.clickSearchMovie(event)}>
                        Search Movie
                      </Button>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Sort By...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => this.sort("movie_name ASC")}
                          >
                            Movie Name (Ascend)
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => this.sort("movie_name DESC")}
                          >
                            Movie Name (Descend)
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => this.sort("movie_id ASC")}
                          >
                            Default
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Form>
                </div>
                {this.state.isLoading ? (
                  <div className="d-flex justify-content-center pb-5">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  this.state.movie.map((element, index) => {
                    const movieId = element.movie_id;
                    return (
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        className="d-flex justify-content-center"
                        key={index}
                      >
                        <Card className={style.movieCard}>
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_URL}${element.movie_image}`}
                          ></Image>
                          <span
                            className="fw-bold text-center"
                            onClick={() => this.goToMovieDetail(movieId)}
                          >
                            {element.movie_name}
                          </span>
                          {this.props.auth.data.user_role === "Admin" ? (
                            <>
                              <Button
                                onClick={() => this.goToManageMovie(movieId)}
                              >
                                Update Movie
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => this.handleDeleteMovie(movieId)}
                              >
                                Delete Movie
                              </Button>
                            </>
                          ) : null}
                        </Card>
                      </Col>
                    );
                  })
                )}
              </Row>
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageId}
                containerClassName={style.pagination}
                subContainerClassName={`${style.pages} ${style.pagination}`}
                activeClassName={style.active}
              />
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
const mapDispatchtoProps = { getAllMovie, getAllMovieByPagination };

export default connect(mapStateToProps, mapDispatchtoProps)(LandingPage);
