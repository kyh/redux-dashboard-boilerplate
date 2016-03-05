import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as authActions from 'redux/modules/auth/auth.actions.js';
import { LoginForm } from 'components';

// const logo = require('images/logo.svg');
require('./Login.scss');

@connect(
  state => ({ auth: state.auth }),
  authActions
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func
  };

  handleSubmit = (creds) => {
    this.props.login(creds);
  };

  render() {
    return (
      <section>
        <LoginForm onSubmit={this.handleSubmit} />

        <div className="text-center">
          <a className="login__forget-button">I forgot my password</a>
        </div>

        <div className="text-center">
          Need an account? <a href="#">Sign Up</a>
        </div>
      </section>
    );
  }
}

// <a href="https://tinyrx.com">
//   <img className="login-logo" src={ logo } alt="TinyRx logo" />
// </a>
