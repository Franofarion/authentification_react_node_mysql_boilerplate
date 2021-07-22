import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Posts from "./posts/Posts";
import "./Main.css";

export default function Main() {
  return (
    <div className="Main">
      <Sidebar />
      <div className="Main-body">
        <Router>
          <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}
