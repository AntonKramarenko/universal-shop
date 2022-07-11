import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { REQUEST_URL } from './constants/urls';

const client = new ApolloClient({
  uri: REQUEST_URL,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
       <App />
      </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);