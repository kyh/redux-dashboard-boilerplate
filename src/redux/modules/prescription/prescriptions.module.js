/**
 * Prescriptions module
 */
import { RESET_CACHE } from '../auth/auth.constants.js';

export const GET_PRESCRIPTIONS = 'GET_PRESCRIPTIONS';
export const GET_PRESCRIPTIONS_SUCCESS = 'GET_PRESCRIPTIONS_SUCCESS';
export const GET_PRESCRIPTIONS_FAIL = 'GET_PRESCRIPTIONS_FAIL';

const DELIVERY_ENDPOINT = '/prescriptions';

// Action Creators
export function isLoaded(globalState) {
  return globalState.prescriptions && globalState.prescriptions.loaded;
}

export function fetchAll() {
  return {
    types: [
      GET_PRESCRIPTIONS,
      GET_PRESCRIPTIONS_SUCCESS,
      GET_PRESCRIPTIONS_FAIL
    ],
    promise: (client) => client.get(DELIVERY_ENDPOINT)
  };
}

// Reducer
const initialState = {
  prescriptions: [],
  loading: false,
  loaded: false
};

const reducerMap = {
  [GET_PRESCRIPTIONS]: (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  },
  [GET_PRESCRIPTIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      prescriptions: action.result,
    };
  },
  [GET_PRESCRIPTIONS_FAIL]: (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      prescriptions: []
    };
  },
  [RESET_CACHE]: () => initialState
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
