import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Board from "./views/Board";
import Spalsh from "./views/Splash";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Spalsh} />
        <Route exact path="/board" component={Board} />
      </Switch>
    </Router>
  );
};

export default App;
  