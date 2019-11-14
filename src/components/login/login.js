import React, { useState, useEffect } from "react";
import Header from "../header/header";
import { Link } from "react-router-dom";
import auth from "../../service/auth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../service/service";

export default function Login(props) {
  const axios = require("axios");
  const [state, setState] = useState({
    customer: {
      user: {
        role: ""
      }
    }
  });

  const [login, setLogin] = useState({
    username: "",
    password: "",
    error: ""
  });

  function onChangeLoginHandler(event) {
    const updatedLogin = {
      ...login,
      [event.target.name]: event.target.value
    };
    setLogin(updatedLogin);
  }

  function apiCall(e) {
    return axios.get(
      API_BASE_URL + "login/" + login.username + "/" + login.password
    );
  }

  function handleLogin() {
    if (login.username) {
      if (login.password) {
        apiCall()
          .then(data => {
            setState({ ...state, customer: data.data });
            if (state.customer.user.role === "ROLE_ADMIN") {
              setLogin({ ...login, error: "Invalid User" });
            }
          })
          .catch(error => {
            console.log(error.response.data);
            setLogin({
              ...login,
              error: error.response.data
            });
          });
      } else {
        setLogin({ ...login, error: "Please enter password" });
      }
    } else {
      setLogin({ ...login, error: "Please enter username" });
    }
  }

  function redirect() {
    //console.log(state.customer);
    if (state.customer.user.role === "ROLE_USER") {
      //alert("Login Success");
      auth.login();
      auth.setHeader(login.username, login.password);
      props.history.push("useraction", { customer: state.customer });
      toast.success("Login Success", {
        position: toast.POSITION.TOP_LEFT
      });
      // return (
      //   <Link
      //     className="btn btn-success btn-block"
      //     style={{ textDecoration: "none" }}
      //     to={{
      //       pathname: "useraction",
      //       state: {
      //         customer: state.customer
      //       }
      //     }}
      //   >
      //     Continue
      //   </Link>
      //);
    }
  }

  return (
    <div className="container-fluid back">
      <Header message="Customer LoGin" />
      <div className="container" style={{ marginTop: "5%", width: "50%" }}>
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ width: "50%" }}>
            <p className="divider-text">
              <span className="bg-light">Enter Credentials</span>
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
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  type="text"
                  value={login.username}
                  onChange={onChangeLoginHandler}
                />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock iconsize"></i>
                  </span>
                </div>
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={login.password}
                  onChange={onChangeLoginHandler}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleLogin}
              >
                Login
              </button>
              <br />
              <div className="text-center" style={{ color: "red" }}>
                {login.error}
              </div>
              {redirect()}
              <br />
              <strong>
                {" "}
                <p className="text-center" style={{ fontSize: "20px" }}>
                  <small>New User?</small>
                  <Link to="registration">
                    <br></br> Create new Account
                  </Link>
                </p>
              </strong>
            </form>
          </article>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
