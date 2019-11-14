import React, { useState } from "react";
import axios from "axios";
import auth from "../../service/auth";
import { toast } from "react-toastify";

export default function NewAccount(props) {
  const [state, setState] = useState({
    accountType: "SAVING",
    accountBalance: Number
  });

  function onChangeCustomerHandler(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function request() {
    console.log(state);
    axios
      .post(
        "http://localhost:8080/customer/addaccount/" + props.location.state,
        state,
        {
          headers: auth.getHeader()
        }
      )
      .then(toast.info("Request registered. Wait for admin approval"))
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="container-fluid display-4 text-center back">
      <div className="jumbotron" style={{ padding: "2%" }}>
        <div className="display-4">New Account Request</div>
      </div>

      <div>
        <i>
          {" "}
          <h2>Please enter details</h2>
        </i>
      </div>
      <br />
      <table
        className="table"
        align="center"
        style={{ fontSize: "30px", width: "30%" }}
      >
        <tbody>
          <tr>
            <td>Account type</td>
            <td>
              <select
                name="accountType"
                className="form-control"
                value={state.accountType}
                onChange={onChangeCustomerHandler}
              >
                <option value="SAVING">SAVING</option>
                <option value="CURRENT">CURRENT</option>
                <option value="CREDIT">CREDIT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Initial Balance</td>
            <td>
              <input
                type="number"
                name="accountBalance"
                className="form-control"
                value={state.accountBalance}
                onChange={onChangeCustomerHandler}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={request}
              >
                Request
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
