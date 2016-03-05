import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';

import auth from './auth/auth.reducer.js';
import user from './user/user.module.js';
import notification from './notification/notification.module.js';

export default combineReducers({
  router,
  reduxAsyncConnect,
  form,
  auth,
  user,
  notification
});
