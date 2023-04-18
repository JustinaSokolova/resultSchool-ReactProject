import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <AppLoader>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </AppLoader>
  );
}

export default App;
