import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieById } from "../../redux/action/Movie";
import { Container } from "react-bootstrap";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import style from "./ManageMovie.module.css";

class PostMovie extends Component {
  render() {
    console.log(this.props.auth.data);
    const { user_role } = this.props.auth.data;
    if (user_role === "Customer") {
      this.props.history.push("/");
    }
    return (
      <>
        <NavBar />
        <div className={style.greyBackground}>
          <Container>
            <h5 className="pt-5">Form Movie</h5>
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
