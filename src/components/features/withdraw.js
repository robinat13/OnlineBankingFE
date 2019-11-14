import React, { useState } from "react";
import Header from "../header/header";
import axios from "axios";
import auth from "../../service/auth";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../service/service";

export default function Withdraw(props) {
  const [state, setState] = useState({
    balance: "",
    accountId: props.location.state.customer.accountId
  });

  const [modalShow, setModalShow] = useState(false);

  function changeHandler(event) {
    const updatedState = { ...state, [event.target.name]: event.target.value };
    setState(updatedState);
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        //size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please confirm that you want to withdraw amount "{state.balance}"
            from the account with ID: "{state.accountId}"
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={withdraw}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function withdraw() {
    if (state.balance)
      axios
        .put(
          API_BASE_URL +
            "customer/withdraw/" +
            props.location.state.customer.accountId +
            "/" +
            state.balance,
          "",
          {
            headers: auth.getHeader()
          }
        )
        .then(response => {
          if (response.status != 500) {
            toast.info("Withdrawl Success !!");
            props.history.push({
              pathname: "/features",
              state: {
                customer: {
                  ...props.location.state.customer
                },
                from: "withdraw"
              }
            });
          }
        })

        .catch(error => {
          setModalShow(false);
          toast.error("Insufficient Balance");
          //console.log(error.response);
        });
  }

  return (
    <div className="container-fluid back">
      <Header message="Withdraw Money" />
      <br />
      <br />

      <table cellPadding="10" align="center">
        <tbody>
          <tr>
            <td>Your account number is</td>
            <td>
              <input
                type="text"
                className="form-control"
                value={props.location.state.customer.accountId}
                readonly
              />
            </td>
          </tr>

          <tr>
            <td>Enter balance to Withdraw</td>
            <td>
              <input
                name="balance"
                type="number"
                className="form-control"
                value={state.balance}
                onChange={changeHandler}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <ButtonToolbar>
                <Button
                  variant="primary"
                  block
                  onClick={() => {
                    if (state.balance !== "") setModalShow(true);
                    else toast.warn("Invalid amount !!");
                  }}
                >
                  Withdraw
                </Button>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </ButtonToolbar>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
