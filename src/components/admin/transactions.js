import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../../service/adminauth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../service/service";

export default function Transactions() {
  const [state, setState] = useState({
    transactions: [],
    searchValue: ""
  });

  let found = false;

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function search() {
    // state.transactions.map(item => {
    //   if (item.tranId == state.searchValue) {
    //     setState({ ...state, transactions: [item] });
    //   }
    // });
    for (let i = 0; i < state.transactions.length; i++) {
      if (state.transactions[i].tranId == state.searchValue) {
        setState({ ...state, transactions: [state.transactions[i]] });
        found = true;
        break;
      }
    }
    if (found == false) {
      toast.error("Not found");
    }
  }

  function reset() {
    getAccountRequests();
  }

  useEffect(() => {
    getAccountRequests();
  }, []);

  function getAccountRequests() {
    axios
      .get(API_BASE_URL + "admin/alltransactions", {
        headers: auth.getHeader()
      })
      .then(data => {
        setState({ ...state, transactions: data.data, searchValue: "" });
      })
      .catch(console.error());
  }

  function renderTable() {
    if (state.transactions !== null) {
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
    }
  }

  return (
    <div className="container-fluid back">
      <div
        className="jumbotron"
        style={{ padding: "10px", position: "fixed", width: "100%" }}
      >
        <div
          className="display-4 font-italic text-center"
          style={{ position: "relative", right: "6%" }}
        >
          All Transactions
        </div>
      </div>
      <div className="conatiner" style={{ paddingTop: "8%" }}>
        <div className="card  bg-transparent">
          <div className="card-header text-center ">
            Search By Transaction Id :{" "}
            <div className="bg-transparent" style={{ display: "inline-block" }}>
              <input
                type="number"
                name="searchValue"
                onChange={handleChange}
                style={{ margin: "1rem" }}
                value={state.searchValue}
              ></input>
              <div style={{ display: "inline-block" }}>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={search}
                >
                  {" "}
                  Search
                </button>{" "}
                <button className="btn btn-outline btn-dark" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-hover">
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
    </div>
  );
}
