
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./user/login/Login";
import SignUp from "./user/signup/SignUp";
import Product from "./product/Product";
import PrivateRoute from "./common/PrivateRoute";
import {SnackbarProvider} from 'notistack';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />}/>
          <Route path="/signup" component={SignUp}/>
          <PrivateRoute path="/products" component={Product}/>
          <PrivateRoute exact path="/" component={Product}/>
        </Switch>
      </Router>
  );
}

export default () => (
    <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
    >
      <App/>
    </SnackbarProvider>
);
