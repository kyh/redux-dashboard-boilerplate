import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';

import auth from './auth/auth.reducer.js';
import notification from './notification/notification.module.js';
import prescriptions from './prescription/prescriptions.module.js';
import prescription from './prescription/prescription.module.js';
import drugs from './prescription/drugs.module.js';
import deliveries from './delivery/deliveries.module.js';


export default combineReducers({
  router,
  reduxAsyncConnect,
  form,
  auth,
  notification,
  prescriptions,
  prescription,
  drugs,
  deliveries
});
