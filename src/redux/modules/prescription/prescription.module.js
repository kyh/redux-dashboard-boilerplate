/**
 * Prescription module - handles single prescription store
 */
import { notify, notifyServerErrors } from '../notification/notification.module.js';
import { PRESCRIPTIONS_ENDPOINT, PRESCRIPTION_MODEL } from './prescriptions.helper.js';

export const ADD_PRESCRIPTION = 'ADD_PRESCRIPTION';
export const ADD_PRESCRIPTION_SUCCESS = 'ADD_PRESCRIPTION_SUCCESS';
export const ADD_PRESCRIPTION_FAIL = 'ADD_PRESCRIPTION_FAIL';

export const REMOVE_PRESCRIPTION = 'REMOVE_PRESCRIPTION';
export const REMOVE_PRESCRIPTION_SUCCESS = 'REMOVE_PRESCRIPTION_SUCCESS';
export const REMOVE_PRESCRIPTION_FAIL = 'REMOVE_PRESCRIPTION_FAIL';

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

// Reducer
const initialState = {
  ...PRESCRIPTION_MODEL,
  loading: false
};

const reducerMap = {
  [ADD_PRESCRIPTION]: (state) => {
    return {
      ...state,
      loading: true
    };
  },
  [ADD_PRESCRIPTION_SUCCESS]: () => initialState,
  [REMOVE_PRESCRIPTION_SUCCESS]: () => initialState
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
