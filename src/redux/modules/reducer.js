import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth/auth.reducer.js';
import prescription from './prescription/prescription.reducer.js';

export default combineReducers({
  router,
  reduxAsyncConnect,
  auth,
  prescription
});
