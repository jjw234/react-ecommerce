import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import store from './redux/store'

import Amplify from 'aws-amplify';
import config from './config/cognito';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";


Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

const client = new AWSAppSyncClient({
  url: 'https://fcaoexa3bnfb3d6okzy6q73isy.appsync-api.ap-northeast-2.amazonaws.com/graphql',
  region: 'ap-northeast-2',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-4fmedphzbbhjfarbpxzmt5fzle',
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root'));
