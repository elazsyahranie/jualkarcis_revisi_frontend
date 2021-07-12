import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import SignIn from "./Pages/SignIn/SignIn";
import LandingPage from "./Pages/LandingPage/LandingPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={SignIn} />
          <Route path="/landing-page" exact component={LandingPage}></Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
