import React, { Component } from "react";
import style from "./seat.module.css";
import { Row, Col } from "react-bootstrap";

class Seat extends Component {
  constructor() {
    super();
    this.state = {
      seatA: [1, 2, 3, 4, 5, 6, 7],
      seatB: [8, 9, 10, 11, 12, 13, 14],
    };
  }

  componentDidMount() {
    this.setAlphabetSeat();
  }

  setAlphabetSeat = () => {
    const { seatAlphabet } = this.props;
    const seatA = this.state.seatA.map((item) => `${seatAlphabet}${item}`);
    const seatB = this.state.seatB.map((item) => `${seatAlphabet}${item}`);
    this.setState({
      seatA: seatA,
      seatB: seatB,
    });
  };

  render() {
    const { seatAlphabet, selected, reserved, removeSeat, bookingSeat } =
      this.props;
    return (
      <>
        <Row className={style.rowSeat}>
          <Col className={style.colSeat}>{seatAlphabet}</Col>
          {this.state.seatA.map((item, index) => {
            return (
              <Col className={style.colSeat} key={index}>
                {reserved.indexOf(item) > -1 ? (
                  <div className={`${style.seat} ${style.seatSold}`}></div>
                ) : selected.indexOf(item) > -1 ? (
                  <div
                    onClick={() => removeSeat(item)}
                    className={`${style.seat} ${
                      reserved.indexOf(item) > -1
                        ? style.seatSold
                        : selected.indexOf(item) > -1
                        ? style.seatSelected
                        : style.seatAvailable
                    }`}
                  ></div>
                ) : !selected.indexOf(item) > -1 &&
                  !reserved.indexOf(item) > -1 ? (
                  <div
                    onClick={() => bookingSeat(item)}
                    className={`${style.seat} ${
                      reserved.indexOf(item) > -1
                        ? style.seatSold
                        : selected.indexOf(item) > -1
                        ? style.seatSelected
                        : style.seatAvailable
                    }`}
                  ></div>
                ) : null}
              </Col>
            );
          })}
          <Col></Col>
          {this.state.seatB.map((item, index) => {
            return (
              <Col className={style.colSeat} key={index}>
                {reserved.indexOf(item) > -1 ? (
                  <div className={`${style.seat} ${style.seatSold}`}></div>
                ) : (
                  <div
                    onClick={() => bookingSeat(item)}
                    className={`${style.seat} ${
                      reserved.indexOf(item) > -1
                        ? style.seatSold
                        : selected.indexOf(item) > -1
                        ? style.seatSelected
                        : style.seatAvailable
                    }`}
                  ></div>
                )}
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Seat;
