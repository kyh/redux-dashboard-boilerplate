export const NOTIFY = 'NOTIFY';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

let notificationID = 0

export function notify(message) {
  return {
    type: NOTIFY,
    message,
    id: notificationID++
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id
  };
}

const initialState = {
  notifications: []
};

const reducerMap = {
  [NOTIFY]: (state, action) => {
    return {
      notifications: [
        ...state.notifications,
        { id: action.id, message: action.message}
      ]
    };
  },
  [REMOVE_NOTIFICATION]: (state, action) => {
    return {
      notifications: state.notifications
        .filter((notification) => notification.id !== action.id)
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}

