import React, { Component } from 'react';
import { AuthApiConsumer } from '../auth-api-context/auth-api-context';

class Login extends Component {

  render() {

    // console.log(this.props)
    return (
      <div>
        <AuthApiConsumer>
          {(
            { auth, handlerOnClickLogin }) => (
              <div>
                <h1>Авторизация с cookie</h1>
                <button onClick={handlerOnClickLogin}>Войти</button>
              </div>

            )
          }
        </AuthApiConsumer>
      </div>
    )
  }

}

export default Login;