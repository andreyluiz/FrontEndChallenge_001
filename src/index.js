import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from './reducers';

import App from './App';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
