import React, { useEffect, useState } from "react";
import Header from "../header/header";
import axios from "axios";
import auth from "../../service/auth";
import { API_BASE_URL } from "../../service/service";

export default function CheckBalance(props) {
  const [state, setState] = useState({
    balance: ""
  });

  useEffect(() => {
    axios
      .get(
        API_BASE_URL +
          "customer/showbalance/" +
          props.location.state.customer.accountId,
        {
          headers: auth.getHeader()
        }
      )
      .then(data => {
        setState({ ...state, balance: data.data });
      });
  }, []);

  return (
    <div className="container-fluid back">
      <Header message="Balance Check" />
      <br />
      <br />
      <p className="display-4 text-center">
        Hello {props.location.state.customer.customerName} your balance is :{" "}
      </p>
      <br />
      <div align="center">
        <input
          type="text"
          className="form-control"
          value={state.balance}
          readOnly
          style={{ width: "30%" }}
        />
      </div>
    </div>
  );
}
