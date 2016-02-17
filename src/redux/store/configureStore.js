import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux'
import createLogger from 'redux-logger';

import clientMiddleware from '../middleware/clientMiddleware';
import rootReducer from 'reducer';

export default function configureStore(apiClient, browserHistory) {

  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(browserHistory);

  let middleware = [
    clientMiddleware(apiClient),
    reduxRouterMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    let createLogger = require('redux-logger');

    middleware = [...middleware, createLogger()];
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware)(_createStore);
  const store = createStoreWithMiddleware(rootReducer);

  return store;
}
