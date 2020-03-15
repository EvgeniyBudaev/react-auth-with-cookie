import React from 'react';

const {
  Provider: AuthApiProvider,
  Consumer: AuthApiConsumer
} = React.createContext();

export {
  AuthApiProvider,
  AuthApiConsumer
}