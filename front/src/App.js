import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Main from "./components/Main";

import { getSession } from "./utils/session";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getSession() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-body">
        <Router>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <PrivateRoute path="/" component={Main} />
            <Route exact path="/">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
