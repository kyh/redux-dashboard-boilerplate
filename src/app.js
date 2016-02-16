import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';

import ApiClient from 'ApiClient';
import getRoutes from './routes';
import configureStore from './redux/store/configureStore';

const apiClient = new ApiClient();

const store = configureStore(apiClient, browserHistory);
const rootElement = document.getElementById('root');

// Required for replaying actions from devtools to work
// reduxRouterMiddleware.listenForReplays(store)

const component = (
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{apiClient}} />
      } history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  rootElement
);
