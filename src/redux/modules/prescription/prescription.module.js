/**
 * Prescription module - handles single prescription store
 */
import { notify, notifyServerErrors } from '../notification/notification.module.js';
import { PRESCRIPTIONS_ENDPOINT } from './prescriptions.helper.js';

export const ADD_PRESCRIPTION = 'ADD_PRESCRIPTION';
export const ADD_PRESCRIPTION_SUCCESS = 'ADD_PRESCRIPTION_SUCCESS';
export const ADD_PRESCRIPTION_FAIL = 'ADD_PRESCRIPTION_FAIL';

export const REMOVE_PRESCRIPTION = 'REMOVE_PRESCRIPTION';
export const REMOVE_PRESCRIPTION_SUCCESS = 'REMOVE_PRESCRIPTION_SUCCESS';
export const REMOVE_PRESCRIPTION_FAIL = 'REMOVE_PRESCRIPTION_FAIL';

export const GET_PRESCRIPTION = 'GET_PRESCRIPTION';
export const GET_PRESCRIPTION_SUCCESS = 'GET_PRESCRIPTION_SUCCESS';
export const GET_PRESCRIPTION_FAIL = 'GET_PRESCRIPTION_FAIL';

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
    id: prescription.id,
    types: [REMOVE_PRESCRIPTION, REMOVE_PRESCRIPTION_SUCCESS, REMOVE_PRESCRIPTION_FAIL],
    onError: onResponseError,
    promise: (client) => client.del(`${PRESCRIPTIONS_ENDPOINT}/${prescription.id}`)
  };
}

export function selectPrescription(prescription) {
  return {
    type: GET_PRESCRIPTION_SUCCESS,
    result: prescription
  };
}

export function getPrescription(id) {
  return {
    types: [GET_PRESCRIPTION, GET_PRESCRIPTION_SUCCESS, GET_PRESCRIPTION_FAIL],
    promise: (client) => client.get(`${PRESCRIPTIONS_ENDPOINT}/${id}`)
  };
}

// Reducer
const initialState = {
  prescription: null,
  loading: false,
  loaded: false
};

const reducerMap = {
  [GET_PRESCRIPTION]: (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  },
  [GET_PRESCRIPTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      prescription: action.result,
      loading: false,
      loaded: true
    };
  },
  [GET_PRESCRIPTION_FAIL]: () => initialState
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
