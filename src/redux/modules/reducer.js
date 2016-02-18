import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth/auth.reducer.js';
import notification from './notification/notification.module.js';
import prescriptions from './prescription/prescriptions.module.js';
import deliveries from './delivery/deliveries.module.js';


export default combineReducers({
  router,
  reduxAsyncConnect,
  auth,
  notification,
  prescriptions,
  deliveries
});
