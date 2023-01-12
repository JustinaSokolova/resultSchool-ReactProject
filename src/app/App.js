import React from "react";
import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/navBar";
import UserPage from "./components/userPage";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/users" component={Users} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
