/**
 * Notifications module
 *
 * Manages alerts and notifications on dashboard
 */
export const NOTIFY = 'NOTIFY';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONS';

const REMOVE_NOTIFICATION_DELAY = 5000;
let notificationID = 0;

// Action Creators
export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id
  };
}

export function removeAllNotifications() {
  return {
    type: REMOVE_ALL_NOTIFICATIONS
  };
}

/**
 * @param {object} notification - notification object which includes
 * {
     status: string - 'success'/'error'
     message: string - message to alert
     remainOnScreen: boolean - should the alert message automatically close?
     clearAllFirst: boolean - clear all previous alerts before broadcast
 * }
 */
export function notify(notification) {
  const {
    status = 'success',
    remainOnScreen = false,
    clearAllFirst = true,
    message
  } = notification;

  return (dispatch) => {
    const currentNotificationID = notificationID++;

    if (clearAllFirst) {
      dispatch(removeAllNotifications());
    }

    dispatch({
      id: currentNotificationID,
      type: NOTIFY,
      status,
      message
    });

    if (!remainOnScreen) {
      setTimeout(() =>
        dispatch(removeNotification(currentNotificationID)),
        REMOVE_NOTIFICATION_DELAY
      );
    }
  };
}

/**
 * @param {array} error - array of errors returned back from the server
 */
export function notifyServerErrors(errors) {
  errors.forEach((error) => notify({
    status: 'error',
    remainOnScreen: true,
    clearAllFirst: errors.length < 1,
    message: error.message,
  }));
}

// Reducer
const initialState = {
  notifications: []
};

const reducerMap = {
  [NOTIFY]: (state, action) => {
    return {
      notifications: [
        ...state.notifications,
        { id: action.id, message: action.message }
      ]
    };
  },
  [REMOVE_NOTIFICATION]: (state, action) => {
    return {
      notifications: state.notifications
        .filter((notification) => notification.id !== action.id)
    };
  },
  [REMOVE_ALL_NOTIFICATIONS]: () => {
    return {
      notifications: []
    };
  }
};

export default function reducer(state = initialState, action = {}) {
  return reducerMap[action.type] ?
    reducerMap[action.type](state, action) : state;
}
