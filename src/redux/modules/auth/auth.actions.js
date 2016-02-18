import * as actions from './auth.constants.js';
import { notify } from '../notification/notification.module.js';
import cookie from 'react-cookie';

const USER_ENDPOINT = '/sessions';
const REGISTER_ENDPOINT = '/users';

export function resetCache() {
  return {
    type: actions.RESET_CACHE
  };
}

function _saveToken(token) {
  cookie.save('token', token);
}

function onLogin(dispatch, response) {
  _saveToken(response.token);
  dispatch(notify({
    message: 'You have successfully logged in.'
  }));
}

function onAuthError(dispatch, response) {
  cookie.remove('token');

  dispatch(notify({
    status: 'error',
    remainOnScreen: true,
    message: response[0]
  }));
}

function onLogout(dispatch) {
  cookie.remove('token');
  dispatch(resetCache());
}

export function isAuthenticated(globalState) {
  return globalState.auth && globalState.auth.isAuthenticated;
}

export function authenticate() {
  return {
    types: [actions.AUTH, actions.AUTH_SUCCESS, actions.AUTH_FAIL],
    onSuccess: (dispatch, response) => _saveToken(response.token),
    onError: onAuthError,
    promise: (client) => client.get(USER_ENDPOINT),
  };
}

export function login(user) {
  return {
    types: [actions.LOGIN, actions.LOGIN_SUCCESS, actions.LOGIN_FAIL],
    onSuccess: onLogin,
    onError: onAuthError,
    promise: (client) => client.post(USER_ENDPOINT, {
      data: { user }
    })
  };
}

export function logout() {
  return {
    types: [actions.LOGOUT, actions.LOGOUT_SUCCESS, actions.LOGOUT_FAIL],
    onSuccess: onLogout,
    promise: (client) => client.del(USER_ENDPOINT)
  };
}

export function register(user) {
  return {
    types: [actions.LOGIN, actions.LOGIN_SUCCESS, actions.LOGIN_FAIL],
    promise: (client) => client.post(REGISTER_ENDPOINT, {
      data: { user }
    })
  };
}
