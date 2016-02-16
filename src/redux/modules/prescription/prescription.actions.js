import * as actions from './prescription.constants.js';

const PRESCRIPTION_ENDPOINT = '/prescriptions';

export function isLoaded(globalState) {
  return globalState.prescription && globalState.prescription.loaded;
}

export function fetchAll() {
  return {
    types: [actions.GET_PRESCRIPTIONS, actions.GET_PRESCRIPTIONS_SUCCESS, actions.GET_PRESCRIPTIONS_FAIL],
    promise: (client) => client.get(PRESCRIPTION_ENDPOINT)
  };
}
