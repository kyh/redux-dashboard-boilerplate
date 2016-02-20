/**
 * Prescription module - handles single prescription store
 */
import { notify, notifyServerErrors } from '../notification/notification.module.js';
import { PRESCRIPTIONS_ENDPOINT, DRUGS_ENDPOINT } from './prescriptions.helper.js';

export const ADD_PRESCRIPTION = 'ADD_PRESCRIPTION';
export const ADD_PRESCRIPTION_SUCCESS = 'ADD_PRESCRIPTION_SUCCESS';
export const ADD_PRESCRIPTION_FAIL = 'ADD_PRESCRIPTION_FAIL';

export const REMOVE_PRESCRIPTION = 'REMOVE_PRESCRIPTION';
export const REMOVE_PRESCRIPTION_SUCCESS = 'REMOVE_PRESCRIPTION_SUCCESS';
export const REMOVE_PRESCRIPTION_FAIL = 'REMOVE_PRESCRIPTION_FAIL';

export const GET_DRUGS = 'GET_DRUGS';
export const GET_DRUGS_SUCCESS = 'GET_DRUGS_SUCCESS';
export const GET_DRUGS_FAIL = 'GET_DRUGS_FAIL';

function onCreatePrescription(dispatch, response) {
  const prescription = response[0];
  dispatch(notify({
    message: `You have added ${prescription.name} to your prescriptions list.`
  }));
}

function onResponseError(dispatch, error) {
  dispatch(notifyServerErrors(error));
}

// Action Creators
export function createPrescription(prescription) {
  return {
    types: [ADD_PRESCRIPTION, ADD_PRESCRIPTION_SUCCESS, ADD_PRESCRIPTION_FAIL],
    onSuccess: onCreatePrescription,
    onError: onResponseError,
    promise: (client) => client.post(PRESCRIPTIONS_ENDPOINT, {
      data: { prescriptions: [prescription] }
    })
  };
}

export function deletePrescription(prescription) {
  return {
    types: [REMOVE_PRESCRIPTION, REMOVE_PRESCRIPTION_SUCCESS, REMOVE_PRESCRIPTION_FAIL],
    onError: onResponseError,
    promise: (client) => client.del(`${PRESCRIPTIONS_ENDPOINT}/${prescription.id}`)
  };
}

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
