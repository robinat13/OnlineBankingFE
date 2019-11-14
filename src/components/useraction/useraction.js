import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./useraction.css";
import auth from "../../service/auth";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
import logoutimage from "../../assets/images/logout.png";
import { toast } from "react-toastify";

export default function UserAction(props) {
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        //size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            See you soon !!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Confirm Logout ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function logout() {
    auth.logout(() => {
      //alert("Logout success");
      auth.setHeader("", "");
      toast.success("Logged Out !!");
      props.history.push("/");
    });
  }

  if (props.location.state) {
    return (
      <div className="container-fluid display-4 text-center back">
        <div className="jumbotron" style={{ padding: "2%" }}>
          <div className="display-4" style={{ display: "inline-block" }}>
            Welcome {props.location.state.customer.customerName}
          </div>
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              right: "2%",
              top: "2.5%"
            }}
          >
            <img
              className="options"
              style={{ height: "10vh", width: "10vh" }}
              src={logoutimage}
              alt=""
              onClick={() => setModalShow(true)}
            />
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>

        <div className="container">
          <p className="display-4 font-italic" style={{ fontSize: "40px" }}>
            Please select an action
          </p>

          <div
            className="card bg-light"
            style={{ width: "50%", margin: "auto" }}
          >
            <div className="card-body">
              <div className="title">
                <h5 className="card-title">Select existing account</h5>
              </div>
              <p className="card-text" style={{ fontSize: "18px" }}>
                Select an already existing Activated account.
              </p>
              <div className="col-md-6 offset-3">
                <Link
                  to={{
                    pathname: "accountselection",
                    state: {
                      customer: props.location.state.customer
                    }
                  }}
                  className="btn btn-dark btn-block"
                  style={{
                    textDecoration: "none"
                  }}
                >
                  Use
                </Link>
              </div>
            </div>
          </div>

          <div
            className="card bg-light"
            style={{ width: "50%", margin: "auto" }}
          >
            <div className="card-body">
              <div className="title">
                <h5 className="card-title">New Account</h5>
              </div>
              <p className="card-text" style={{ fontSize: "20px" }}>
                Request for a new Bank account.
              </p>
              <div className="col-md-6 offset-3">
                <Link
                  to={{
                    pathname: "customer/newaccount",
                    state: props.location.state.customer.customerId
                  }}
                  className="btn btn-dark btn-block"
                  style={{ textDecoration: "none" }}
                >
                  Request
                </Link>
              </div>
            </div>
          </div>

          <div
            className="card bg-light"
            style={{ width: "50%", margin: "auto" }}
          >
            <div className="card-body">
              <div className="title">
                <h5 className="card-title">View Profile</h5>
              </div>
              <p className="card-text" style={{ fontSize: "20px" }}>
                View all of your details
              </p>
              <div className="col-md-6 offset-3">
                <Link
                  to={{
                    pathname: "customer/customerprofile",
                    state: props.location.state.customer
                  }}
                  className="btn btn-dark btn-block"
                  style={{ textDecoration: "none" }}
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-4 offset-4">
              <button
                className="btn btn-primary btn-block btn-lg"
                type="button"
              >
                Edit Profile
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>User not logged in</h1>
      </div>
    );
  }
}
