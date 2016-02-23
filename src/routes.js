import React from 'react';
import { IndexRoute, Route } from 'react-router';
import * as Containers from './containers';
import {
  isAuthenticated as isAuthLoaded, authenticate as loadAuth
} from 'redux/modules/auth/auth.actions.js';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { user: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        });
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth())
        .then(checkAuth, checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={Containers.App}>
      { /* Routes requiring login */ }
      <Route component={Containers.Dashboard} onEnter={requireLogin}>
        <IndexRoute component={Containers.Prescriptions}/>
        <Route path="new/prescription" component={Containers.AddPrescription}/>
        <Route path="prescription/:id" component={Containers.SinglePrescription}/>
        <Route path="history" component={Containers.OrderHistory}/>
      </Route>

      { /* Routes */ }
      <Route path="reset" component={Containers.PasswordReset}/>
      <Route path="login" component={Containers.Login}/>

      { /* Catch all route */ }
      <Route path="*" component={Containers.NotFound} status={404} />
    </Route>
  );
};
