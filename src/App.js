import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { setCurrentUser } from "./redux/actions/auth";
import { BrowserRouter, Route } from "react-router-dom";
import Orders from "./components/Orders";
import Chef from "./components/Chef";
import ChangePassword from "./components/ChangePassword";
import Dish from "./components/Dish";
import Welcome from "./components/Welcome";
import Customers from "./components/Customers";
import Coupan from "./components/Coupan";

const App = ({ auth, setCurrentUser }) => {
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) setCurrentUser(JSON.parse(token));
  }, []);

  return auth.authenticated === true ? (
    <BrowserRouter basename="/#">
      <Navbar />
      <Route exact path="/" component={Welcome} />
      <Route exact path="/chef" component={Chef} />
      <Route exact path="/dish" component={Dish} />
      <Route exact path="/customer" component={Customers} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/coupons" component={Coupan} />
      <Route exact path="/changepassword" component={ChangePassword} />
    </BrowserRouter>
  ) : (
    <Login />
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { setCurrentUser })(App);
