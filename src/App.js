import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./Helpers/PrivateRoute";
import PublicRoute from "./Helpers/PublicRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import LandingPage from "./Pages/LandingPage/LandingPage";
import MovieDetail from "./Pages/MovieDetail/MovieDetail";
import OrderPage from "./Pages/OrderPage/OrderPage";
import EditProfile from "./Pages/EditProfile/EditProfile";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import ManageMovie from "./Pages/ManageMovie/ManageMovie";
import TicketPage from "./Pages/TicketPage/TicketPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PublicRoute
              restricted={true}
              path="/sign-up"
              exact
              component={SignUp}
            />
            <PublicRoute restricted={true} path="/" exact component={SignIn} />
            <PrivateRoute path="/landing-page" exact component={LandingPage} />
            <PrivateRoute
              path="/movie-detail/:id"
              exact
              component={MovieDetail}
            />
            <PrivateRoute
              path={`/order-page/:movieId`}
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
            <PrivateRoute
              path="/manage-movie/:movieId"
              exact
              component={ManageMovie}
            ></PrivateRoute>
            <PrivateRoute
              path="/ticket-page"
              exact
              component={TicketPage}
            ></PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
