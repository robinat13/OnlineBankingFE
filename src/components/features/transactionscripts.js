import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/header";
import auth from "../../service/auth";
import { API_BASE_URL } from "../../service/service";

export default function TransactionScripts(props) {
  const [state, setState] = useState({
    transactions: []
  });

  useEffect(() => {
    axios
      .get(
        API_BASE_URL +
          "customer/transactions/" +
          props.location.state.customer.accountId,
        {
          headers: auth.getHeader()
        }
      )
      .then(data => {
        setState({ ...state, transactions: data.data });
      });
  }, []);

  function renderTable() {
    if (state.transactions.length <= 10) {
      return (
        <tbody>
          {state.transactions.map((item, index) => {
            return (
              <tr key={item.tranId}>
                <td>{index + 1}</td>
                <td>{item.tranId}</td>
                <td>{item.tranDescription}</td>
                <td>{item.tranDate}</td>
                <td>{item.tranType}</td>
                <td>{item.tranAmount}</td>
              </tr>
            );
          })}
        </tbody>
      );
    } else
      return (
        <tbody>
          {state.transactions
            .slice(state.transactions.length - 10, state.transactions.length)
            .reverse()
            .map((item, index) => {
              return (
                <tr key={item.tranId}>
                  <td>{index + 1}</td>
                  <td>{item.tranId}</td>
                  <td>{item.tranDescription}</td>
                  <td>{item.tranDate}</td>
                  <td>{item.tranType}</td>
                  <td>{item.tranAmount}</td>
                </tr>
              );
            })}
        </tbody>
      );
  }

  return (
    <div className="container-fluid back">
      <Header message="Transaction Scripts" />
      <br />
      <br />
      <div align="center">
        <h3>Last 10 Transactions</h3>
      </div>

      <table className="table table-striped" align="center">
        <thead>
          <tr>
            <th>#</th>
            <th>Tran. Id</th>
            <th>Description</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        {renderTable()}
      </table>
    </div>
  );
}
