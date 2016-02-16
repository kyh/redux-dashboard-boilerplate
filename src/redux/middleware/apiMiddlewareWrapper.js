/**
 * Converts ApiClient into a middleware
 * Expected action object:
  {
    types: [REQUEST_ACTION, SUCCESS_ACTION, FAILURE_ACTION],
    onSuccess: SUCCESS_CALLBACK,
    onFailure: FAULURE_CALLBACK,
    promise: (client) => client[METHOD]
  }
 *
 * @param {ApiClient}
 * @return {func} - returns redux middleware
 */

export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          let transformedResponse = _actionCallback(result, action.onSuccess);
          return next({...rest, result: transformedResponse, type: SUCCESS})
        },
        (error) => {
          let transformedResponse = _actionCallback(error, action.onFailure);
          return next({...rest, error: transformedResponse, type: FAILURE})
        }
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}

function _actionCallback(result, callback) {
  if (callback) {
    let transformedResponse = callback(result);
    return transformedResponse || result;
  }

  return result;
}
