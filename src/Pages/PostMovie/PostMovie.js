import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieById } from "../../redux/action/Movie";

class PostMovie extends Component {
  componentDidMount() {
    console.log(this.props.auth.data);
    const { user_role } = this.props.auth.data;
    if (user_role !== "Admin") {
      this.props.history.push("/landing-page");
    }
  }

  render() {
    // console.log(this.props.auth.data);
    return <h1>PostMovie Page!</h1>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movie: state.movie,
});
const mapDispatchToProps = { getMovieById };

export default connect(mapStateToProps, mapDispatchToProps)(PostMovie);

// export default PostMovie;
