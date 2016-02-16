import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isAuthenticated as isAuthLoaded, authenticate as loadAuth } from 'auth/auth.actions.js';


@connect(
  state => ({user: state.auth.user}),
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.push('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.push('/login');
    }
  }

  render() {
    return (
      this.props.children
    );
  }
}
