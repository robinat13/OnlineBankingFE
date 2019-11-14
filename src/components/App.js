import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./homepage/homepage";
import Registration from "./registration/registration";
import Login from "./login/login";
import UserAction from "./useraction/useraction";
import AccountSelection from "./useraction/accountselection";
import Features from "./features/features";
import Sidebar from "./admin/sidebar";
import CheckBalance from "./features/checkbalance";
import Deposit from "./features/deposit";
import Withdraw from "./features/withdraw";
import FundTransfer from "./features/fundtransfer";
import TransactionScripts from "./features/transactionscripts";
import ViewProfile from "./useraction/viewprofile";
import NewAccount from "./useraction/newaccount";
import { ProtectedRoute } from "./protectedroute";
import AdminLogin from "./admin/adminlogin";
import { ProtectedAdminRoute } from "./protectedadminroutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  toast.configure({
    autoClose: 6000,
    draggable: false

    //etc you get the idea
  });
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
      <Route path="/admin/login" component={AdminLogin} />
      <ProtectedRoute path="/useraction" component={UserAction} />
      <ProtectedRoute path="/accountselection" component={AccountSelection} />
      <ProtectedRoute path="/features/checkbalance" component={CheckBalance} />
      <ProtectedRoute path="/features/deposit" component={Deposit} />
      <ProtectedRoute path="/features/withdraw" component={Withdraw} />
      <ProtectedRoute path="/features/transfer" component={FundTransfer} />
      <ProtectedRoute
        path="/features/transactionscripts"
        component={TransactionScripts}
      />
      <ProtectedRoute path="/features" component={Features} />
      <ProtectedAdminRoute path="/admin/dashboard" component={Sidebar} />
      <ProtectedRoute
        path="/customer/customerprofile"
        component={ViewProfile}
      />
      <ProtectedRoute path="/customer/newaccount" component={NewAccount} />

      <Route path="*" component={() => "404 Not found"} />
    </Switch>
  );
}

export default App;
