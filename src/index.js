import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import rootReducer from './reducers';

import { App, SurveysIndex, SurveysShow } from './components'

import './index.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SurveysIndex}/>
        <Route path="/survey/:id" component={SurveysShow}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
