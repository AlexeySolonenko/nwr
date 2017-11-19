import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
window.axios = axios;  // temporary


const store = createStore(reducers, { }, applyMiddleware(reduxThunk) );


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector('#root')
);


// https://asdflksjdfqweqwe3f3t2d2.localtunnel.me/api/surveys/webhooks
// Improve design of the survey list cards
// Allow users to delete surveys that have been created
// Allow users to specify 'from field on survey emails
// Allow client side soring of surveys
// Allow surveys to be created in 'draft mode'
