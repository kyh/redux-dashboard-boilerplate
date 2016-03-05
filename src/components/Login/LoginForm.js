import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import loginValidator from './login.validation.js';

const FORM_NAME = 'login';

@reduxForm({
  form: FORM_NAME,
  fields: ['email', 'password'],
  validate: loginValidator
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (this.props.initialValues) {
      this.props.initializeForm(this.props.initialValues);
    }
  }

  render() {
    const {
      fields: { email, password },
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login__input-wrapper">
          <input name="email" type="email"
            className={email.error && email.touched && 'error'}
            placeholder="Email"
            {...email}
            required
          />
          <input name="password" type="password"
            className={password.error && password.touched && 'error'}
            placeholder="Password"
            {...password}
            required
          />
        </div>
        <button type="submit" className="login__submit-button" disabled={submitting}>
          Login
        </button>
      </form>
    );
  }
}
