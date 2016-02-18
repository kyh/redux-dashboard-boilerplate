/**
 * Deliveries module
 */
import { RESET_CACHE } from '../auth/auth.constants.js';

export const GET_DELIVERIES = 'GET_DELIVERIES';
export const GET_DELIVERIES_SUCCESS = 'GET_DELIVERIES_SUCCESS';
export const GET_DELIVERIES_FAIL = 'GET_DELIVERIES_FAIL';

const DELIVERY_ENDPOINT = '/deliveries';

// Action Creators
export function isLoaded(globalState) {
  return globalState.deliveries && globalState.deliveries.loaded;
}

export function fetchAll() {
  return {
    types: [
      GET_DELIVERIES,
      GET_DELIVERIES_SUCCESS,
      GET_DELIVERIES_FAIL
    ],
    promise: (client) => client.get(DELIVERY_ENDPOINT)
  };
}

// Reducer
const initialState = {
  deliveries: [],
  loading: false,
  loaded: false
};

const reducerMap = {
  [GET_DELIVERIES]: (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  },
  [GET_DELIVERIES_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      deliveries: action.result,
    };
  },
  [GET_DELIVERIES_FAIL]: () => initialState,
  [RESET_CACHE]: () => initialState
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
