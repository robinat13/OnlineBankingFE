import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./registration.css";

import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../service/service";
function Registration(props) {
  const [userDetails, setUserDetails] = useState({
    customerName: "",
    email: "",
    address: "",
    panCard: "",
    gender: "",
    mobile: ""
  });

  function globalToast(message) {
    const _toast = toast.error(message);
    return _toast;
  }

  const successToast = () => toast.success("Account Created Successfully");

  const [user, setUser] = useState({
    userName: "",
    password: "",
    secretQuestion: "",
    transactionPassword: "",
    lockStatus: ""
  });
  // eslint-disable-next-line
  const [temp, setTemp] = useState({
    confirmPassword: ""
  });

  function onChangeCustomerHandler(event) {
    const updatedUserDetails = {
      ...userDetails,
      [event.target.name]: event.target.value
    };
    setUserDetails(updatedUserDetails);
  }

  function onChangeUserHandler(event) {
    const updateUser = {
      ...user,
      [event.target.name]: event.target.value
    };
    setUser(updateUser);
  }

  function onChangePassword(event) {
    setTemp({ ...temp, [event.target.name]: event.target.value });
  }

  function formSubmitHandler() {
    userDetails.user = user;
    if (user.userName === "") {
      globalToast("Empty username");
    } else if (
      !userDetails.customerName.match("[A-Z][a-z]*([ ][A-Z][a-z]*)*")
    ) {
      globalToast("Invalid Name");
    } else if (!userDetails.email.match("[^@]+@[^.]+..+")) {
      globalToast("Invalid Email");
    } else if (userDetails.address === "") {
      globalToast("Invalid Address");
    } else if (!userDetails.panCard.match("[0-9]+")) {
      globalToast("Invalid Pancard, only numbers allowed");
    } else if (!userDetails.mobile.match("[0-9]{10}")) {
      globalToast("Invalid mobile number, 10 digits required");
    } else if (user.password !== temp.confirmPassword) {
      globalToast("Password Doesnt Match");
    } else {
      axios
        .post(API_BASE_URL + "addcustomer", userDetails)
        .then(res => {
          console.log(res);
          successToast(props.history.push("login"));
        })
        .catch(error => {
          console.log(error.response.data);
          globalToast("User Already Exists");
        });
    }
  }

  return (
    <div className="container-fluid">
      <div className="card bg-light bg">
        <article className="card-body mx-auto" style={{ width: "40%" }}>
          <h6 className="display-4 text-center">Create Account</h6>
          <p className="text-center">Get started with your free account</p>
          <p className="divider-text">
            <span className="bg-light">Enter Details</span>
          </p>

          <form>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user iconsize"></i>{" "}
                </span>
              </div>
              <input
                name="userName"
                className="form-control"
                placeholder="Username"
                type="text"
                value={user.userName}
                onChange={onChangeUserHandler}
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user-plus iconsize"></i>{" "}
                </span>
              </div>
              <select className="custom-select" style={{ maxWidth: "80px" }}>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="">-</option>
              </select>
              <input
                name="customerName"
                className="form-control"
                placeholder="Full name"
                type="text"
                value={userDetails.customerName}
                onChange={onChangeCustomerHandler}
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fas fa-venus-mars iconsize"></i>{" "}
                </span>
              </div>
              <select
                name="gender"
                className="form-control"
                value={userDetails.gender}
                onChange={onChangeCustomerHandler}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope iconsize"></i>{" "}
                </span>
              </div>
              <input
                name="email"
                className="form-control"
                placeholder="Email address"
                type="email"
                value={userDetails.email}
                onChange={onChangeCustomerHandler}
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-address-card iconsize"></i>{" "}
                </span>
              </div>
              <input
                name="address"
                className="form-control"
                placeholder="Address"
                type="text"
                value={userDetails.address}
                onChange={onChangeCustomerHandler}
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user iconsize"></i>{" "}
                </span>
              </div>
              <input
                name="panCard"
                className="form-control"
                placeholder="Pan Card Number"
                type="text"
                value={userDetails.panCard}
                onChange={onChangeCustomerHandler}
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-phone iconsize"></i>{" "}
                </span>
              </div>
              <select className="custom-select" style={{ maxWidth: "80px" }}>
                <option selected="" value="+91">
                  +91
                </option>
                <option value="+0">+0</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+33">+33</option>
              </select>
              <input
                name="mobile"
                className="form-control"
                placeholder="Phone number"
                type="text"
                value={userDetails.mobile}
                onChange={onChangeCustomerHandler}
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock iconsize"></i>{" "}
                </span>
              </div>
              <input
                name="password"
                className="form-control"
                placeholder="Create password"
                type="password"
                value={user.password}
                onChange={onChangeUserHandler}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock iconsize"></i>{" "}
                </span>
              </div>
              <input
                name="confirmPassword"
                className="form-control"
                placeholder="Repeat password"
                type="password"
                value={temp.confirmPassword}
                onChange={onChangePassword}
              />
            </div>

            {/* <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fas fa-balance-scale iconsize"></i>{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="Initial Account Balance"
                type="text"
              />
            </div> */}

            <div className="form-group">
              <button
                type="button"
                onClick={formSubmitHandler}
                className="btn btn-primary btn-block"
              >
                Create Account{" "}
              </button>
            </div>
            <strong>
              {" "}
              <p
                className="text-center"
                style={{ color: "white", fontSize: "23px" }}
              >
                Have an account? <Link to="login"> Login</Link>
              </p>
            </strong>

            <div className="form-group" align="center">
              <Link
                to="/"
                className="btn btn-warning"
                style={{ textDecoration: "none", color: "white" }}
              >
                Back to Home
              </Link>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}

export default Registration;
