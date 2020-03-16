import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../login";
import Logout from "../logout";
import { AuthApiProvider } from "../auth-api-context";
import TestartURL from "./testart-url";

class App extends Component {
  state = {
    auth: false
  };

  componentDidMount() {
    this.readCookie();
    console.log("componentDidMount: ");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth !== prevState.auth) {
      this.readCookie();
    }
    console.log("componentDidUpdate: ");
  }

  readCookie = () => {
    const user = Cookies.get("user4");
    if (user) {
      this.setState({
        auth: true
      });
    }
  };

  handlerOnClickLogin = () => {
    this.setState({
      auth: true
    });
    Cookies.set(
      "_identity",
      "b1063fa405e89a118a33cc3f8544c92dce0bb4f6a3d57835b5b165141acb9506a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A50%3A%22%5B56674%2C%227SeJn00FyrFNictZcnC9ygfC4uAs4gi5%22%2C2592000%5D%22%3B%7D"
    );
    Cookies.set(
      "_csrf",
      "cbd52a038231cd220c695b0f243697fd6938d189fd70f459f698b58a9ef3e34ea%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22jqcbUlcQBkHh_FcorRO9JPbSFxDz7pFe%22%3B%7D"
    );
    Cookies.remove("ulogin_token");
  };

  handlerOnClickLogout = () => {
    this.setState({
      auth: false
    });
    Cookies.remove("_identity");
    Cookies.remove("__csrf");
  };

  render() {
    const contexValue = {
      auth: this.state.auth,
      handlerOnClickLogin: this.handlerOnClickLogin,
      handlerOnClickLogout: this.handlerOnClickLogout
    };
    console.log("Component App is auth: " + this.state.auth);
    let routes = (
      <Switch>
        <Route path="/auth" component={Login} exact />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.state.auth) {
      routes = (
        <Switch>
          <Route path="*" component={TestartURL} exact />
          <Redirect component={TestartURL} />
        </Switch>
      );
    }

    return (
      <AuthApiProvider value={contexValue}>
        <Router>{routes}</Router>
      </AuthApiProvider>
    );
  }
}

export default App;
