import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import auth from "../../service/auth";
import Header from "../header/header";

export default function AccountSelection(props) {
  const [state, setState] = useState({
    accounts: []
  });

  useEffect(() => {
    getAccounts();
  }, [state.accounts]);

  function getAccounts() {
    axios
      .get(
        "http://localhost:8080/customer/accounts/" +
          props.location.state.customer.customerId,
        {
          headers: auth.getHeader()
        }
      )
      .then(data => {
        setState({ ...state, accounts: data.data });
      })
      .catch(console.error());
  }

  function renderTable() {
    if (state.requests !== null) {
      return (
        <>
          <tbody>
            {state.accounts.map((item, index) => {
              return (
                <tr key={item.accountId}>
                  <td>{index + 1}</td>
                  <td>{item.accountId}</td>
                  <td>{item.accountType}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "features",
                        state: {
                          customer: {
                            ...props.location.state.customer,
                            accountId: item.accountId
                          },
                          from: "features"
                        }
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      {/* <Link
                      to={{
                        pathname: "features",
                        state: {
                          accountId: item.accountId,
                          customerName:
                            props.location.state.customer.customerName
                        }
                      }}
                      style={{ textDecoration: "none" }}
                    > */}
                      <button type="button" className="btn btn-success btn-lg">
                        USE
                      </button>
                    </Link>
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
      <Header message="Account Selection" />

      {/* <p
        className="display-4 font-italic text-center"
        style={{ fontSize: "40px", position: "relative", top: "0.7em" }}
      >
        Please select a Account
      </p> */}

      <table className="table table-hover" style={{ marginTop: "3%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Account ID</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        {renderTable()}
      </table>
    </div>
  );
}
