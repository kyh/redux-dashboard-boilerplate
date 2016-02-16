import * as actions from './auth.constants.js';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  statusText: null
};

const reducerMap = {
  [actions.LOGIN]: (state, action) => {
    return {
      ...state,
      loading: true
    };
  },
  [actions.LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      user: action.result.user,
      token: action.result.token,
    };
  },
  [actions.LOGIN_FAIL]: (state, action) => {
    return {
      ...state,
      loading: false,
      user: null,
      token: null,
      statusText: action.error
    };
  },
  [actions.LOGOUT]: (state, action) => {
    return {
      ...state,
      loading: true
    };
  },
  [actions.LOGOUT_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      user: null,
      token: null
    };
  },
  [actions.LOGOUT_FAIL]: (state, action) => {
    return {
      ...state,
      loading: false,
      statusText: action.error
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}

