/**
 * Profile module - handles single user profile store
 */
import * as actions from '../auth/auth.constants.js';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';

const PROFILE_ENDPOINT = '/users';

/**
 * User Model
 * This is a subset of the full User Model from the back end
 * (https://github.com/tinyrx/ops/blob/master/app/models/user.rb)
 */
export const USER_MODEL = {
  full_name: '',
  email: '',
  phone: null
};

// Action Creators
export function updateProfile(user) {
  return {
    types: [EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL],
    promise: (client) => client.put(PROFILE_ENDPOINT, {
      user
    })
  };
}

// Reducer
const initialState = {
  user: null,
  editing: false
};

const reducerMap = {
  [actions.AUTH_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.result.user
    };
  },
  [actions.LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.result.user
    };
  },
  [actions.LOGOUT_SUCCESS]: (state) => {
    return {
      ...state,
      user: null
    };
  },

  [EDIT_PROFILE]: (state) => {
    return {
      ...state,
      editing: true
    };
  },
  [EDIT_PROFILE_SUCCESS]: (state, action) => {
    return {
      ...state,
      editing: false,
      user: action.result
    };
  },
  [EDIT_PROFILE_FAIL]: (state) => {
    return {
      ...state,
      editing: false
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
