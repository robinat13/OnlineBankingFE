import React from "react";

export default function Dashboard(props) {
  console.log(props.customer);
  return (
    <div className="container-fluid display-4 text-center back">
      <div className="jumbotron" style={{ padding: "2%" }}>
        <div className="display-4">Welcome {props.customer.customerName}</div>
      </div>

      <i>
        <h2>Admin Profile</h2>
      </i>

      <table
        align="center"
        className="table table-striped"
        style={{ fontSize: "30px", width: "60%", marginTop: "3%" }}
      >
        <tbody>
          <tr>
            <td>Admin Id</td>
            <td>{props.customer.customerId}</td>
          </tr>

          <tr>
            <td>Username</td>
            <td>{props.customer.user.userName}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{props.customer.email}</td>
          </tr>

          <tr>
            <td>Mobile</td>
            <td>{props.customer.mobile}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
