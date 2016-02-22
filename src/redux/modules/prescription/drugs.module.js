/**
 * Drug module - handles drug autocomplete
 */
import { notifyServerErrors } from '../notification/notification.module.js';
import { DRUGS_ENDPOINT } from './prescriptions.helper.js';

export const GET_DRUGS = 'GET_DRUGS';
export const GET_DRUGS_SUCCESS = 'GET_DRUGS_SUCCESS';
export const GET_DRUGS_FAIL = 'GET_DRUGS_FAIL';

function onResponseError(dispatch, error) {
  dispatch(notifyServerErrors(error));
}

// Action Creators
export function isDrugsLoaded(globalState) {
  return globalState.prescription && globalState.prescription.loaded;
}

export function fetchDrugs() {
  return {
    types: [GET_DRUGS, GET_DRUGS_SUCCESS, GET_DRUGS_FAIL],
    onError: onResponseError,
    promise: (client) => client.get(DRUGS_ENDPOINT)
  };
}

// Reducer
const initialState = {
  drugs: [],
  loading: false,
  loaded: false
};

const reducerMap = {
  [GET_DRUGS]: (state) => {
    return {
      ...state,
      loading: true
    };
  },
  [GET_DRUGS_SUCCESS]: (state, action) => {
    return {
      ...state,
      drugs: action.result,
      loading: false,
      loaded: true
    };
  },
  [GET_DRUGS_FAIL]: (state) => {
    return {
      ...state,
      loading: false
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
