import React from 'react';
import { AuthApiConsumer } from '../auth-api-context/auth-api-context';

const Logout = () => {
  return (
    <div>
      <AuthApiConsumer>
        {(
          { auth, handlerOnClickLogout }) => (
            <div>
              <h1>Страница Logout</h1>
              <button onClick={handlerOnClickLogout}>Выйти</button>
            </div>

          )
        }
      </AuthApiConsumer>
    </div>
  )
}

export default Logout;