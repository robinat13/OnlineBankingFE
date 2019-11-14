import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../../service/adminauth";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../service/service";

export default function AccountRequests() {
  //console.log(auth.getHeader());
  const [state, setState] = useState({
    requests: []
  });

  useEffect(() => {
    getAccountRequests();
  }, [state.requests]);

  function getAccountRequests() {
    axios
      .get(API_BASE_URL + "admin/accountrequests/PENDING", {
        headers: auth.getHeader()
      })
      .then(data => {
        setState({ ...state, requests: data.data });
      })
      .catch(console.error());
  }

  function renderTable() {
    if (state.requests !== null) {
      return (
        <>
          <tbody>
            {state.requests.map((item, index) => {
              return (
                <tr key={item.accountId}>
                  <td>{index + 1}</td>
                  <td>{item.accountId}</td>
                  <td>{item.customer.customerId}</td>
                  <td>{item.accountType}</td>
                  <td>{item.openDate}</td>
                  <td>{item.accountBalance}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success btn-block"
                      onClick={() => {
                        axios
                          .put(
                            API_BASE_URL +
                              "admin/activateaccount/" +
                              item.accountId,
                            "",
                            { headers: auth.getHeader() }
                          )
                          .then(data => {
                            setState({ ...state, requests: data.data });
                          });
                      }}
                    >
                      Activate
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={() => {
                        axios
                          .put(
                            API_BASE_URL +
                              "admin/rejectaccount/" +
                              item.accountId,
                            "",
                            { headers: auth.getHeader() }
                          )
                          .then(data => {
                            setState({ ...state, requests: data.data });
                          });
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </>
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
          Account Requests
        </div>
      </div>
      <div className="conatiner" style={{ paddingTop: "8%" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Account ID</th>
              <th>Customer ID</th>
              <th>Type</th>
              <th>Request Date</th>
              <th>Initial Balance</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          {renderTable()}
        </table>
      </div>
    </div>
  );
}
