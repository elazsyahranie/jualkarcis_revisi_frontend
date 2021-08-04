import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovie } from "../../redux/action/Movie";
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

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
      },
      movie: [],
      data: [],
      pagination: {},
      totalPage: "",
      page: 1,
      sort: "movie_id ASC",
      search: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.getAllMovie(this.state.movie);
    this.getMoviebyPagination();
  }

  getMoviebyPagination = () => {
    // console.log(this.state.search);
    this.setState({ isLoading: true });
    axiosApiIntances
      .get(
        `movie/pagination/?page=${this.state.page}&limit=4&sort=${this.state.sort}&search=${this.state.search}`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          movie: res.data.data.result,
          pagination: res.data.data.pageInfo,
          totalPage: res.data.data.pageInfo.totalPage,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        });
      }, 2000);
  };

  handleSearchMovie = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  clickSearchMovie = () => {
    this.getMoviebyPagination();
  };

  movieSort = (movieSortCategory) => {
    console.log(movieSortCategory);
    this.setState({ sort: movieSortCategory }, () => {
      this.getMoviebyPagination();
    });
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
    // console.log("Delete movie works!" + " " + movieId);
    axiosApiIntances
      .delete(`movie/${movieId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getMoviebyPagination();
      // console.log(this.state.page);
    });
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    const { isLoading } = this.state;
    // const pagination = this.state.pagination;
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
                          Dropdown Button
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Something else
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Form>
                  <div>
                    <Button onClick={() => this.movieSort("movie_name ASC")}>
                      Movie Name ASC
                    </Button>
                    <Button onClick={() => this.movieSort("movie_name DESC")}>
                      Movie Name DESC
                    </Button>
                    <Button onClick={() => this.movieSort("movie_id ASC")}>
                      Movie ID ASC
                    </Button>
                    <Button onClick={() => this.movieSort("movie_id DESC")}>
                      Movie ID DESC
                    </Button>
                  </div>
                </div>
                {isLoading ||
                this.state.movie === null ||
                this.state.movie === undefined ||
                this.state.movie === "" ||
                this.state.pagination.totalPage === null ||
                this.state.pagination.totalPage === undefined ||
                this.state.pagination.totalPage === "" ? (
                  <div className="d-flex justify-content-center pb-5">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  this.state.movie.map((element, a) => {
                    const movieId = element.movie_id;
                    return (
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        className="d-flex justify-content-center"
                      >
                        <Card className={style.movieCard}>
                          <Image
                            src={`${process.env.REACT_APP_IMAGE_URL}${element.movie_image}`}
                          ></Image>
                          <span
                            className="fw-bold text-center"
                            onClick={() => this.goToMovieDetail(movieId)}
                            key={a}
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
              {this.state.pagination.totalPage === null ||
              this.state.pagination.totalPage === undefined ||
              this.state.pagination.totalPage === "" ? null : (
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={style.pagination}
                  subContainerClassName={`${style.pages} ${style.pagination}`}
                  activeClassName={style.active}
                />
              )}
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
