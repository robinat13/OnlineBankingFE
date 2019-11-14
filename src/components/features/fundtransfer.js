import React, { useState } from "react";
import Header from "../header/header";
import axios from "axios";
import auth from "../../service/auth";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../service/service";

export default function FundTransfer(props) {
  const [state, setState] = useState({
    accountId: props.location.state.customer.accountId,
    payeeAccountId: "",
    transferAmount: ""
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
          <Modal.Title id="contained-modal-title-vcenter">
            Fund Transfer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please confirm that you want to transfer amount "
            {state.transferAmount}" from your account with ID: "
            {state.accountId}" to another account with Id: "
            {state.payeeAccountId}"
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={transfer}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function transfer() {
    axios
      .post(API_BASE_URL + "customer/fundtransfer", state, {
        headers: auth.getHeader()
      })
      .then(response => {
        if (response.status == 200) {
          toast.info("Transfer Successfull !!");
          props.history.push({
            pathname: "/features",
            state: {
              customer: {
                ...props.location.state.customer
              },
              from: "transfer"
            }
          });
        }
      })

      .catch(error => {
        console.log(error.response);
        setModalShow(false);
        toast.error(error.response.data);
        //console.log(error.response);
      });
  }

  return (
    <div className="container-fluid back">
      <Header message="Fund Transfer" />
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
                readOnly
                value={state.accountId}
              />
            </td>
          </tr>

          <tr>
            <td>Enter Partner's Account number</td>
            <td>
              <input
                name="payeeAccountId"
                type="text"
                className="form-control"
                value={state.payeeAccountId}
                onChange={changeHandler}
              />
            </td>
          </tr>

          <tr>
            <td>Enter amount to transfer</td>
            <td>
              <input
                name="transferAmount"
                type="text"
                className="form-control"
                value={state.transferAmount}
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
                    if (
                      (state.transferAmount !== "") &
                      (state.payeeAccountId !== "")
                    )
                      setModalShow(true);
                    else toast.warn("Please fill details !!");
                  }}
                >
                  Transfer
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
