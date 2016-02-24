/**
 * Prescriptions module - handles multiple prescriptions store
 */
import { RESET_CACHE } from '../auth/auth.constants.js';
import { ADD_PRESCRIPTION_SUCCESS, REMOVE_PRESCRIPTION_SUCCESS } from './prescription.module.js';
import { PRESCRIPTIONS_ENDPOINT, attachPrescriptionUiInfo } from './prescriptions.helper.js';

export const GET_PRESCRIPTIONS = 'GET_PRESCRIPTIONS';
export const GET_PRESCRIPTIONS_SUCCESS = 'GET_PRESCRIPTIONS_SUCCESS';
export const GET_PRESCRIPTIONS_FAIL = 'GET_PRESCRIPTIONS_FAIL';

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
    promise: (client) => client.get(PRESCRIPTIONS_ENDPOINT)
  };
}

// Reducer
const initialState = {
  all: [],
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
    const prescriptions = action.result
      .map((prescription) => attachPrescriptionUiInfo(prescription));

    return {
      ...state,
      all: prescriptions,
      loading: false,
      loaded: true
    };
  },
  [GET_PRESCRIPTIONS_FAIL]: () => initialState,

  [ADD_PRESCRIPTION_SUCCESS]: (state, action) => {
    const prescription = attachPrescriptionUiInfo(action.result[0]);

    return {
      ...state,
      all: [...state.all, prescription]
    };
  },

  [REMOVE_PRESCRIPTION_SUCCESS]: (state, action) => {
    const prescriptions = state.all
      .filter((prescription) => prescription.id !== action.id);

    return {
      ...state,
      all: prescriptions
    };
  },

  [RESET_CACHE]: () => initialState
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
