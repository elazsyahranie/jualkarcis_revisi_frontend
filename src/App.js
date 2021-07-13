import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./Helpers/PrivateRoute";
import PublicRoute from "./Helpers/PublicRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SignIn from "./Pages/SignIn/SignIn";
import LandingPage from "./Pages/LandingPage/LandingPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={SignIn} />
          <Route path="/landing-page" exact component={LandingPage} />
        </Router>
      </Provider>
    );
  }
}

export default App;
