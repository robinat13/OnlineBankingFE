import React from "react";

export default function ViewProfile(props) {
  return (
    <div className="container-fluid display-4 text-center back">
      <div className="jumbotron" style={{ padding: "2%" }}>
        <div className="display-4">
          Welcome {props.location.state.customerName}
        </div>
      </div>

      <i>
        <h2>Customer Profile</h2>
      </i>

      <table
        align="center"
        className="table table-striped"
        style={{ fontSize: "30px", width: "60%", marginTop: "3%" }}
      >
        <tbody>
          <tr>
            <td>Customer Id</td>
            <td>{props.location.state.customerId}</td>
          </tr>

          <tr>
            <td>Username</td>
            <td>{props.location.state.user.userName}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{props.location.state.email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{props.location.state.address}</td>
          </tr>
          <tr>
            <td>Pancard</td>
            <td>{props.location.state.panCard}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{props.location.state.mobile}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
