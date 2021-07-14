import React, { Component } from "react";
import axiosApiIntances from "../../Utils/axios";

class MovieDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.getDataById(id);
  }

  getDataById = (id) => {
    console.log("Get Data !");
    axiosApiIntances
      .get(`movie/${id}`)
      .then((res) => {
        console.log(res.data.data[0]);
        // this.setState({
        //   data: res.data.data[0],
        //   /* Digunakan untuk memanipulasi data state */
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>MovieDetail Page!</h1>
      </>
    );
  }
}

export default MovieDetail;
