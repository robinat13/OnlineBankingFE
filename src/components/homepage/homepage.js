import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

import Header from "../header/header";

function HomePage() {
  return (
    <div
      className="container-fluid p-0"
      style={{ height: "100vh", backgroundColor: "#e0fcff" }}
    >
      <Header message="Welcome To Online Banking" />

      <div className="row homepageaction">
        <div className="col-sm-3 offset-3">
          <p>
            <Link
              to="login"
              className="btn btn-success btn-block btn-lg"
              style={{
                textDecoration: "none",
                color: "white"
                //backgroundColor: "#52de97"
              }}
            >
              Log In
              <span style={{ float: "right" }}>
                <i
                  className="fas fa-sign-in-alt"
                  style={{ fontSize: "30px" }}
                ></i>
              </span>
            </Link>
          </p>
        </div>

        <div className="col-sm-3">
          <p>
            <Link
              className="btn btn-success btn-block btn-lg"
              to="registration"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Up
              <span style={{ float: "right" }}>
                <i
                  className="fas fa-user-plus"
                  style={{ fontSize: "30px" }}
                ></i>
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-sm-3 offset-3 text-center">
          <h5>Existing User</h5>
        </div>
        <div className="col-sm-3 text-center">
          <h5>New User</h5>
        </div>
      </div> */}

      <footer className="footer">
        <div className="container-fluid p-0">
          <div className="row text-left">
            <div className="col-md-4">
              <div className="pad">
                <h4 className="text-light">Our History</h4>
                <p className="text-muted">
                  Setup in 2004, we continue to serve our services to our happy
                  and satisfied customers
                </p>
                <p className="pt-4 text-muted">
                  <span>Copyright ©2019 All rights reserved</span>
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="pad">
                <h4 className="text-light">About Us</h4>
                <p className="text-muted">
                  Global leading service provider in Banking Sector. You are
                  currently viewing our universally used E-Wallet portal
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pad">
                <h4 className="text-light">Trust</h4>
                <p className="text-muted">
                  Our hard working and tallented team works seamlessly to keep
                  your Information safe and locked. More than a million happy
                  customers and still counting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
