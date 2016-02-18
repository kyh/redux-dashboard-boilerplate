import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';

import clientMiddleware from '../middleware/clientMiddleware';
import rootReducer from '../modules/reducer';

export default function configureStore(apiClient, browserHistory) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(browserHistory);

  let middleware = [
    clientMiddleware(apiClient),
    reduxRouterMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    middleware = [...middleware, createLogger()];
  }

  const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(_createStore);

  const store = createStoreWithMiddleware(rootReducer);

  return store;
}
