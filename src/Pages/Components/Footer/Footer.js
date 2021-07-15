import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "./Footer.module.css";

// Images
import tickitzLogo from "../Tickitz_2.png";
import ebvLogo from "../Vector.png";
import cineOneLogo from "../CineOne.png";
import hiflix from "../hiflix.png";

//Logo
import facebook from "../icons/eva_facebook-outline.png";
import instagram from "../icons/bx_bxl-instagram.png";
import twitter from "../icons/eva_twitter-outline.png";
import youtube from "../icons/feather_youtube.png";

class Footer extends Component {
  render() {
    return (
      <>
        <Container>
          <Row className="p-4">
            <Col lg={4} md={4} sm={4} xs={12} className="pt-2">
              <img src={tickitzLogo} alt="" class="img-fluid"></img>
              <p className="pt-3">
                Stop waiting in line, buy tickets conveniently, watch movies
                quietly.
              </p>
            </Col>
            <Col lg={2} md={2} sm={2} xs={12}>
              <div className="pt-3">
                <h5>Explore</h5>
                <div className="pt-3">
                  <div className="pb-1">Cinemas</div>
                  <div className="pb-1">Movie List</div>
                  <div className="pb-1">My Ticket</div>
                  <div className="pb-1">Notification</div>
                </div>
              </div>
            </Col>
            <Col lg={3} md={3} sm={3} xs={12}>
              <div className="pt-3">
                <h5 className="pb-3">Our Sponsor</h5>
                <img src={ebvLogo} alt="" class="img-fluid pb-4"></img>

                <img src={cineOneLogo} alt="" class="img-fluid pb-4"></img>

                <img src={hiflix} alt="" class="img-fluid pb-4"></img>
              </div>
            </Col>
            <Col lg={3} md={3} sm={3} xs={12}>
              <div className="pt-3">
                <div>
                  <h5 className="pb-3">Follow Us</h5>
                </div>
                <div className="pb-3">
                  <img src={facebook} alt="" className="img-fluid"></img>
                  <span>Tickitz Cinema ID</span>
                </div>
                <div className="pb-3">
                  <img src={instagram} alt="" className="img-fluid"></img>
                  <span>tickitz.id</span>
                </div>
                <div className="pb-3">
                  <img src={twitter} alt="" className="img-fluid"></img>
                  <span>tickitz.id</span>
                </div>
                <div className="pb-3">
                  <img src={youtube} alt="" className="img-fluid"></img>
                  <span>Tickitz Cinema ID</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="text-center pb-3">
          © 2020 JualKarcis. All rights reserved.
        </Container>
      </>
    );
  }
}

export default Footer;
