import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./Helpers/PrivateRoute";
import PublicRoute from "./Helpers/PublicRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SignIn from "./Pages/SignIn/SignIn";
import LandingPage from "./Pages/LandingPage/LandingPage";
import MovieDetail from "./Pages/MovieDetail/MovieDetail";
import OrderPage from "./Pages/OrderPage/OrderPage";
import EditProfile from "./Pages/EditProfile/EditProfile";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PublicRoute restricted={true} path="/" exact component={SignIn} />
            <PrivateRoute path="/landing-page" exact component={LandingPage} />
            <PrivateRoute
              path="/movie-detail/:id"
              exact
              component={MovieDetail}
            />
            <PrivateRoute
              path={`/order-page/:movieId/:premiereId`}
              exact
              component={OrderPage}
            ></PrivateRoute>
            <PrivateRoute
              path="/edit-profile/:id"
              exact
              component={EditProfile}
            ></PrivateRoute>
            <PrivateRoute
              path="/payment-page"
              exact
              component={PaymentPage}
            ></PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
