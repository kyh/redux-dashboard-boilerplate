import * as actions from './prescription.constants.js';

const initialState = {
  prescriptions: [],
  loading: false,
  loaded: false
};

const reducerMap = {
  [actions.GET_PRESCRIPTIONS]: (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  },
  [actions.GET_PRESCRIPTIONS_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      prescriptions: action.result,
    };
  },
  [actions.GET_PRESCRIPTIONS_FAIL]: (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      prescriptions: []
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
