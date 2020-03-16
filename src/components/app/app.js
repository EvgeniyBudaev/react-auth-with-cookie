import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Cookies from 'js-cookie';
import Login from '../login';
import Logout from '../logout';
import { AuthApiProvider } from '../auth-api-context';

class App extends Component {
  state = {
    auth: false
  }

  componentDidMount() {
    this.readCookie()
    console.log("componentDidMount: ")
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth !== prevState.auth) {
      this.readCookie()
    }
    console.log("componentDidUpdate: ")
  }


  readCookie = () => {
    const user = Cookies.get("user4");
    if (user) {
      this.setState({
        auth: true
      })
    }
  }

  handlerOnClickLogin = () => {
    this.setState({
      auth: true
    })
    Cookies.set("user4", "4")
  }

  handlerOnClickLogout = () => {
    this.setState({
      auth: false
    })
    Cookies.remove("user4");
  }


  render() {
    const contexValue = {
      auth: this.state.auth,
      handlerOnClickLogin: this.handlerOnClickLogin,
      handlerOnClickLogout: this.handlerOnClickLogout
    }
    console.log("Component App is auth: " + this.state.auth)
    let routes = (
      <Switch>
        <Route path="/login" component={Login} exact />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.state.auth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} exact />
          <Redirect to="/logout" />
        </Switch>
      );
    }

    return <AuthApiProvider value={contexValue}>
      <Router>
        {routes}
      </Router>
    </AuthApiProvider>


  }
}

export default App;